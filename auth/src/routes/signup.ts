import express, {Request, Response} from "express";
import {User} from '../models/user';
import {body} from "express-validator";
import validator from "validator";
import {BadRequestError} from "@hashcash/common";
import {ErrorCodes} from  "@hashcash/common";
import {validateRequest} from  "@hashcash/common";
import {EventModel} from "@hashcash/common";
import {Subjects} from  "@hashcash/common";

import {otpGenerator} from "../utils/otpGenerator";
import {UserCreatedPublisher} from "../events/publishers/userCreatedPublisher";
import {natsWrapper} from "../nats/nats-wrapper";
import {UserCreatedEvent} from  "@hashcash/common";
import {sendSuccess} from  "@hashcash/common";


const router = express.Router();


router.post('/signup', [
    body("email")
        .notEmpty()
        .trim()
        .withMessage("email is not provided")
        ,body("name")
        .trim()
        .notEmpty()
        .withMessage("name is not provided")
    ,body("password")
        .trim()
        .notEmpty()
        .withMessage("password is not provided")


],validateRequest,async (req:Request,res:Response)=>{

    const {email, name ,password} = req.body
    // const admin= new User({
    //     email,password,isEmailVerified:true,
    //     twoWayAuth:true,
    //     name:'mohamed mahmoud',
    //     role:'admin'
    // })
    // await admin.save();
    let eventId:string;
    // checking if the full name is valid
    if(!validator.isAlpha(name,undefined,{ignore:' _'}))
        throw new BadRequestError(['Name must be only letters'],ErrorCodes.invalidUserName)
    //check if email is valid
    if (!validator.isEmail(email))
        throw new BadRequestError(['Email is not valid'],ErrorCodes.invalidEmail);

    //checking if email already exist
    let pevUser = await User.findOne({email});
    // console.log(pevUser)
    if (pevUser)
        throw new BadRequestError(['Email is already in use '],ErrorCodes.invalidEmail)

    //check if password valid
    if (password.length<10)
        throw new BadRequestError(['Password must be more than 10 letters'],ErrorCodes.badRequest)

        const otp =otpGenerator()

        let pubEvent:UserCreatedEvent ;

         const user  = User.build({email,name,password});
         user.set(
             {otpNumber:otp,
             otpExpiryDate:Date.now()+ 2 * 60 * 1000})


    await user.save();

        pubEvent = {
            subject:Subjects.userCreated,
            data:{
                email,
                name,
                otp,
                userId:user!.id
            }
        }
        const  event = EventModel.build({
            subject: Subjects.userCreated,
            sent: false,
            data:pubEvent["data"]
        })
        event.save()
        eventId= event.id;


        sendSuccess(res,201,{
            userId: user.id
        })

        await new UserCreatedPublisher(natsWrapper.client).publish(pubEvent['data'])
         const savedEvent = await EventModel.findById(eventId);
        if (savedEvent){
             savedEvent.set({sent:true});
            await savedEvent.save();
        }


        // sendSuccess(res,200,{created:true})
    })



export {router as signupRoute}
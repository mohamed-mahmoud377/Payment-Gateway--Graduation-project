import express, {Request, Response} from "express";
import {User} from '../models/user';
import {body} from "express-validator";
import validator from "validator";
import {BadRequestError} from "../errors/badRequestError";
import {ErrorCodes} from "../errors/types/errorCodes";
import {validateRequest} from "../middlewares/validateRequest";
import {Event} from "../models/events";
import {Subjects} from "../events/Subjects";
import mongoose from "mongoose";
import {otpGenerator} from "../utils/otpGenerator";
import {UserCreatedPublisher} from "../events/publishers/userCreatedPublisher";
import {natsWrapper} from "../nats/nats-wrapper";
import {UserCreatedEvent} from "../events/eventTypes/userCreatedEvent";
import {sendSuccess} from "../utils/sendSuccess";


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
    let eventId:string;
    //check if email is valid
    if (!validator.isEmail(email))
        throw new BadRequestError(['Email is not valid'],ErrorCodes.invalidEmail);

    //checking if email already exist
    let pevUser = await User.findOne({email});
    // console.log(pevUser)
    if (pevUser)
        throw new BadRequestError(['Email is already in use '],ErrorCodes.invalidEmail)

    // checking if the full name is valid
    if(!validator.isAlpha(name,undefined,{ignore:' _'}))
        throw new BadRequestError(['Name must be only letters'],ErrorCodes.invalidUserName)

    //check if password valid
    if (password.length<10)
        throw new BadRequestError(['Password must be more than 10 letters'],ErrorCodes.badRequest)

        const otp =otpGenerator()

        let pubEvent:UserCreatedEvent ;

         const user  = User.build({email,name,password});
         user.set(
             {otpNumber:otp,
             otpExpiryDate:Date.now()+ 1 * 60 * 1000})

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
        const  event = Event.build({
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
         const savedEvent = await Event.findById(eventId);
        if (savedEvent){
             savedEvent.set({sent:true});
            await savedEvent.save();
        }


    })



export {router as signupRoute}
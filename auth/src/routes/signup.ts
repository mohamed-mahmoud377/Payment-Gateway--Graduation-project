import express, {Request, Response} from "express";
import {Merchant} from "../models/merchant";
import {body} from "express-validator";
import validator from "validator";
import {BadRequestError} from "../errors/badRequestError";
import {ErrorCodes} from "../errors/types/errorCodes";
import {validateRequest} from "../middlewares/validateRequest";
import {Event} from "../models/events";
import {Subjects} from "../events/Subjects";
import mongoose from "mongoose";
import {otpGenerator} from "../utils/otpGenerator";
import {MerchantCreatedPublisher} from "../events/publishers/merchantCreatedPublisher";
import {natsWrapper} from "../nats/nats-wrapper";
import {MerchantCreatedEvent} from "../events/eventTypes/merchantCreatedEvent";
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
    let pevMerchant = await Merchant.findOne({email});
    // console.log(pevMerchant)
    if (pevMerchant)
        throw new BadRequestError(['Email is already in use '],ErrorCodes.invalidEmail)

    // checking if the full name is valid
    if(!validator.isAlpha(name,undefined,{ignore:' _'}))
        throw new BadRequestError(['Name must be only letters'],ErrorCodes.invalidUserName)

    //check if password valid
    if (password.length<10)
        throw new BadRequestError(['Password must be more than 10 letters'],ErrorCodes.badRequest)

        const otp =otpGenerator()

        let pubEvent:MerchantCreatedEvent ;

         const merchant  = Merchant.build({email,name,password});
         merchant.set(
             {otpNumber:otp,
             otpExpiryDate:Date.now()+ 10 * 60 * 1000})

           await merchant.save();
        pubEvent = {
            subject:Subjects.merchantCreated,
            data:{
                email,
                name,
                otp,
                merchantId:merchant!.id
            }
        }
        const  event = Event.build({
            subject: Subjects.merchantCreated,
            sent: false,
            data:pubEvent["data"]
        })
        event.save()
        eventId= event.id;

        sendSuccess(res,201,{
            merchantId: merchant.id
        })

        await new MerchantCreatedPublisher(natsWrapper.client).publish(pubEvent['data'])
         const savedEvent = await Event.findById(eventId);
        if (savedEvent){
             savedEvent.set({sent:true});
            await savedEvent.save();
        }


    })



export {router as signupRoute}
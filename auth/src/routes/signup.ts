import express, {Request,Response} from "express";
import * as assert from "assert";
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


const router = express.Router();


router.post('/signup', [
    body("email")
        .notEmpty()
        .withMessage("email is not provided")
        ,body("name")
        .notEmpty()
        .withMessage("name is not provided")
    ,body("password")
        .notEmpty()
        .withMessage("password is not provided")


],validateRequest,async (req:Request,res:Response)=>{
    const {email, name ,password} = req.body
    //check if email is valid
    if (!validator.isEmail(email))
        throw new BadRequestError(['Email is not valid'],ErrorCodes.invalidEmail);

    //checking if email already exist
    let merchant = await Merchant.findOne({email});
    console.log(merchant)
    if (merchant)
        throw new BadRequestError(['Email is already in use '],ErrorCodes.invalidEmail)

    // checking if the full name is valid
    if(!validator.isAscii(name))
        throw new BadRequestError(['Name must be only letters'],ErrorCodes.invalidUserName)

    //check if password valid
    if (password.length<10)
        throw new BadRequestError(['Password must be more than 10 letters'],ErrorCodes.badRequest)

    const otp =otpGenerator()

    const session = await mongoose.startSession();
    let eventId ;

    // add the merchant and event in the database with a Transaction to make sure that where ever we save a doc
    // we must send its event no matter what
    await session.withTransaction(async ()=>{

        const merchant  = Merchant.build({email,name,password});
         merchant.set(
             {otpNumber:otp,
             otpExpiryDate:Date.now()+ 10 * 60 * 1000})

           await merchant.save();
        const  event = Event.build({
            subject: Subjects.merchantCreated,
            sent: false,
            data: {
                email,
                name,
                otp
            }
        })
        event.save()
        eventId  = event.id;

    })

    session.endSession();

    // await MerchantCreatedPublisher.publish({
    //     email,
    //     name,
    //     otp,
    //     merchantId:merchant.id
    // })

    res.send(201);

})

export {router as signupRoute}
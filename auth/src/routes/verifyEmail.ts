import express, {Request, Response} from "express";
import mongoose from "mongoose";
import {BadRequestError, sendSuccess, validateRequest} from "@hashcash/common";
import {User} from "../models/user";
import {body} from "express-validator";
import {EmailVerifiedPublisher} from "../events/publishers/emailVerifiedPublisher";
import {natsWrapper} from "../nats/nats-wrapper";

const router = express.Router();



router.post('/verify-email' ,[
    body('otp')
    .trim()
    .notEmpty()
    .withMessage('OTP number must be provided.'),
    body('userId')
        .trim()
        .notEmpty()
        .withMessage("userId must be provided.")],validateRequest,
    (async (req:Request, res:Response) => {
    //get the data from the body
    const {otp,userId}= req.body;
    // checking first if the user id is valid before going to database
    if (!mongoose.isValidObjectId( userId)){
        throw new  BadRequestError(['OTP password is wrong']);
    }
    //we if the user is existed if the id is right and the otp is right and it does not expire
    const user = await User.findOne({
        _id:userId,
        otpVerify:otp,
        otpExpiryDate:{$gt:Date.now()}
    })
    if (!user){
        throw new  BadRequestError(['OTP is wrong try again or resend it']);

    }
    // setting the email to be verified
    user.otpVerify=undefined;
    user.otpExpiryDate=undefined;
    user.isEmailVerified= true;
    await user.save();

    sendSuccess(res,200,undefined);

    await new EmailVerifiedPublisher(natsWrapper.client).publish({
        email: user.email, name: user.name, userId: user.id

    })



}))


export {
    router as verifyEmailRoute
}
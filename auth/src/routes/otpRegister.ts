import express, {Request, Response} from "express";
import {body} from "express-validator";
import mongoose from "mongoose";
import {BadRequestError} from "../errors/badRequestError";
import {ErrorCodes} from "../errors/types/errorCodes";
import {sendSuccess} from "../utils/sendSuccess";
import {User} from "../models/user";
import jwt from 'jsonwebtoken'
const router  = express.Router();

router.post('/otp-registration',[
    body('otp')
        .trim()
        .notEmpty()
        .withMessage('OTP number must be provided.'),
    body('userId')
        .trim()
        .notEmpty()
        .withMessage("userId must be provided.")

],async (req:Request,res:Response)=>{
    const {otp,userId}= req.body;
    // checking first if the user id is valid before going to database
    if (!mongoose.isValidObjectId( userId)){
        throw new  BadRequestError(['OTP password is wrong'],ErrorCodes.badRequest);
    }
    const user = await User.findOne({
        id:userId,
        otpNumber:otp,
        otpExpiryDate:{$gt:Date.now()}
    })
    if (!user){
        throw new  BadRequestError(['OTP is wrong try again or resend it'],ErrorCodes.badRequest);

    }

    const accessToken = jwt.sign({
        userId:user.id,
        role:user.role
    },process.env.JWT_KEY!,{
        expiresIn:60*2
    })
    const refreshToken = jwt.sign({
        userId:user.id,
        role:user.role
    },process.env.JWT_KEY!,{
        expiresIn:'7d'
    })



    sendSuccess(res,200,{})

})


export {router as otpRegister}
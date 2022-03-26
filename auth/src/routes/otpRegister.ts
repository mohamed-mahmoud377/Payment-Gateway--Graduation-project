import express, {Request, Response} from "express";
import parser from 'ua-parser-js'
import {body} from "express-validator";
import mongoose from "mongoose";
import {BadRequestError} from "../errors/badRequestError";
import {sendSuccess} from "../utils/sendSuccess";
import {User} from "../models/user";
import {jwtGenerator} from "../utils/jwtGenerator";
import {userAgentParser} from "../utils/userAgentParser";
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
    //get the data from the body
    const {otp,userId}= req.body;
    // checking first if the user id is valid before going to database
    if (!mongoose.isValidObjectId( userId)){
        throw new  BadRequestError(['OTP password is wrong']);
    }
    //we if the user is existed if the id is right and the otp is right and it does not expire
    const user = await User.findOne({
        id:userId,
        otpNumber:otp,
        otpExpiryDate:{$gt:Date.now()}
    })
    if (!user){
        throw new  BadRequestError(['OTP is wrong try again or resend it']);

    }
    // now that the otp is right lets create the access and refresh token
    const payload = {
        id:user.id,
        role:user.role,
        email:user.email
    }

    const {accessToken,refreshToken} = jwtGenerator(payload,false);
    //create a login session for the user
    let  {browser,os,device} = userAgentParser(req.get('user-agent')!);
    if (device)
        os= os +" - "+device
    user.loginSession.push({
            token:refreshToken,
            ip:req.ip,
            browser:browser,
            device:os,

    })
    // setting the email to be verified
    user.otpNumber=undefined;
    user.otpExpiryDate=undefined;
    user.isEmailVerified= true;
    user.save();
    // send the access token as a cookie too
    req.session= {jwt:accessToken};
    sendSuccess(res,200,{
        accessToken,
        refreshToken,
    })

})


export {router as otpRegister}
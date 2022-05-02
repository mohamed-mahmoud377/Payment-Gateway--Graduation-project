import express, {Request, Response} from "express";
import {body} from "express-validator";
import mongoose from "mongoose";
import {BadRequestError} from  "@hashcash/common";
import {sendSuccess} from  "@hashcash/common";
import {User} from "../models/user";
import {jwtGenerator} from "../utils/jwtGenerator";
import {userAgentParser} from "../utils/userAgentParser";
import {Roles} from "../types/roles";
const router  = express.Router();


router.post('/otp-registration',[
    body('otp')
        .trim()
        .notEmpty()
        .withMessage('OTP number must be provided.'),
    body('userId')
        .trim()
        .notEmpty()
        .withMessage("userId must be provided."),
    body('rememberMe')
        .notEmpty()
        .withMessage('rememberMe must be provided')

],async (req:Request,res:Response)=>{
    let access,refresh:string;
    //get the data from the body
    const {otp,userId,rememberMe}= req.body;
    // checking first if the user id is valid before going to database
    if (!mongoose.isValidObjectId( userId)){
        throw new  BadRequestError(['OTP password is wrong']);
    }
    //we if the user is existed if the id is right and the otp is right and it does not expire
    const user = await User.findOne({
        _id:userId,
        otpResister:otp,
        otpExpiryDate:{$gt:Date.now()}
    })
    if (!user){
        throw new  BadRequestError(['OTP is wrong try again or resend it']);

    }
    //creating the sessionId manually so I can send it with the payload
    const sessionId = new mongoose.Types.ObjectId();

    // now that the otp is right lets create the access and refresh token
    const payload = {
        sessionId:sessionId.toHexString(),
        id:user.id,
        role:user.role,
        email:user.email,
        isEmailVerified:user.isEmailVerified
    }

        const {accessToken,refreshToken} = jwtGenerator(payload,rememberMe);
        access = accessToken;
        refresh = refreshToken

    //create a login session for the user
    let  {browser,os,device} = userAgentParser(req.get('user-agent')!);
    if (device)
        os= os +" - "+device
    user.loginSession.push({
            _id:sessionId,
            token:refresh!,
            ip:req.ip,
            browser:browser,
            device:os,
    })

    // setting otpNumber and otpExpiryDate to null
    user.otpResister=undefined;
    user.otpExpiryDate=undefined;
    await user.save();

    req.session= {jwt:access};
// if admin only make him logged in for 15 min do not give him the refresh token
    if (user.role===Roles.ADMIN){
        return sendSuccess(res,200,{
            accessToken:access,
        })
    }
    sendSuccess(res,200,{
        accessToken:access,
        refreshToken:refresh,
    })

})


export {router as otpRegisterRoute}
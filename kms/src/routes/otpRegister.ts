import express, {Request, Response} from "express";
import {body} from "express-validator";
import mongoose from "mongoose";
import {BadRequestError, validateRequest} from "@hashcash/common";
import {sendSuccess} from  "@hashcash/common";
import {Admin} from "../models/admin";
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

],validateRequest,async (req:Request,res:Response)=>{

    //get the data from the body
    const {otp,userId}= req.body;
    // checking first if the user id is valid before going to database
    if (!mongoose.isValidObjectId( userId)){
        throw new  BadRequestError(['OTP password is wrong']);
    }
    //we if the user is existed if the id is right and the otp is right and it does not expire
    const admin = await Admin.findOne({
        id:userId,
        otpNumber:otp,
        otpExpiryDate:{$gt:Date.now()}
    })
    if (!admin){
        throw new  BadRequestError(['OTP is wrong']);

    }
    // now that the otp is right lets create the access and refresh token
    const payload = {
        id:admin.id,
        role:'admin',
    }
    console.log(payload);


    const {accessToken} = jwtGenerator(payload,process.env.JWT_ADMIN_EXPIRES_IN!);



    //create a login session for the user
    let  {browser,os,device} = userAgentParser(req.get('user-agent')!);
    if (device)
        os= os +" - "+device
    admin.loginSession.push({
        ip:req.ip,
        browser:browser,
        device:os,

    })

    // setting the email to be verified
    admin.otpNumber=undefined;
    admin.otpExpiryDate=undefined;
    await admin.save();


    // send the access token as a cookie too
    req.session= {jwt:accessToken};
    sendSuccess(res,200,{
        accessToken,
    })

})


export {router as otpRegisterRoute}
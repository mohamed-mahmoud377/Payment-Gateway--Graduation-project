import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest} from  "@hashcash/common";
import {User} from "../models/user";

import {PasswordManger} from "../utils/passwordManger";
import {jwtGenerator} from "../utils/jwtGenerator";
import {sendSuccess} from  "@hashcash/common";
import {NotAuthorizedError} from  "@hashcash/common";
import {userAgentParser} from "../utils/userAgentParser";
import {twoWayAuth} from "../middlewares/twoWayAuth";
import mongoose from "mongoose";
import {Roles} from "../types/roles";

const router = express.Router();

router.post('/login',[
    body('email')
        .isEmail()
        .withMessage("Invalid credentials.")
        .notEmpty()
        .withMessage('Invalid credentials.'),
    body('password')
        .notEmpty()
        .withMessage('Invalid credentials.'),
    body('rememberMe')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid credentials.')

],validateRequest,twoWayAuth,async (req:Request ,res:Response)=>{
    const {email,password,rememberMe} = req.body;
    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw new NotAuthorizedError(["Invalid credentials"]);
    }


    const passwordMatch = await PasswordManger.compare(existingUser.password,password);
    if (!passwordMatch){
        throw new NotAuthorizedError(["Invalid Credentials"]);
    }
    if(!existingUser.isActive ){
        throw new NotAuthorizedError(["your account is deactivated please contact support"]);

    }

    existingUser.set({
        lastLogin:Date.now()
    })

    //creating the sessionId manually so I can send it with the payload
    const sessionId = new mongoose.Types.ObjectId();
    const payload = {
        sessionId:sessionId.toHexString(),
        id:existingUser.id,
        role:existingUser.role,
        email:existingUser.email,
        isEmailVerified:existingUser.isEmailVerified,
        verifiedMerchant:existingUser.verifiedMerchant

    }
    const {accessToken,refreshToken} = jwtGenerator(payload,rememberMe);
    let  {browser,os,device} = userAgentParser(req.get('user-agent')!);
    if (device)
        os= os +" - "+device
    existingUser.loginSession.push({
        _id:sessionId,
        token:refreshToken,
        ip:req.ip,
        browser:browser,
        device:os,

    })
    existingUser.save();

    // req.session= {jwt:accessToken};
    res.cookie("jwt",accessToken,{
        sameSite:"lax",



        // httpOnly:true,

    })

    // if admin only make him logged in for 15 min do not give him the refresh token
    if (existingUser.role===Roles.ADMIN){
        return sendSuccess(res,200,{
            accessToken,
        })
    }
    sendSuccess(res,200,{
        accessToken,
        refreshToken,
    })
})

export { router as loginRoute}
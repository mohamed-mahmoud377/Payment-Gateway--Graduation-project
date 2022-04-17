import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validateRequest";
import {User} from "../models/user";

import {PasswordManger} from "../utils/passwordManger";
import {jwtGenerator} from "../utils/jwtGenerator";
import {sendSuccess} from "../utils/sendSuccess";
import {NotAuthorizedError} from "../errors/notAuthorizedError";
import {userAgentParser} from "../utils/userAgentParser";
import {twoWayAuth} from "../middlewares/twoWayAuth";
import mongoose from "mongoose";

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

    if(!existingUser.isActive){
        throw new NotAuthorizedError(["Invalid credentials"]);

    }

    const passwordMatch = await PasswordManger.compare(existingUser.password,password);
    if (!passwordMatch){
        throw new NotAuthorizedError(["Invalid Credentials"]);
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
        isEmailVerified:existingUser.isEmailVerified
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

    req.session= {jwt:accessToken};
    sendSuccess(res,200,{
        accessToken,
        refreshToken,
    })
})

export { router as loginRoute}
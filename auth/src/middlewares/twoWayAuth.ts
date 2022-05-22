import express, {NextFunction, Request, Response} from "express";


import {sendSuccess} from "@hashcash/common";
import {User} from "../models/user";
import {NotAuthorizedError} from "@hashcash/common";
import {PasswordManger} from "../utils/passwordManger";
import {Subjects} from  "@hashcash/common";
import {EventModel} from "@hashcash/common";
import {natsWrapper} from "../nats/nats-wrapper";
import {otpGenerator} from "../utils/otpGenerator";
import {UserLoggingInPublisher} from "../events/publishers/userLoggingInPublisher";
import {UserLoggingInEvent} from  "@hashcash/common";



export const twoWayAuth = async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password,rememberMe} = req.body;

    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw new NotAuthorizedError(["Invalid credentials"]);
    }

    const passwordMatch = await PasswordManger.compare(existingUser.password,password);
    if (!passwordMatch){
        throw new NotAuthorizedError(["Invalid Credentials"]);
    }
    if (!existingUser.twoWayAuth){
        return next()
    }
    if(!existingUser.isActive ){
        throw new NotAuthorizedError(["your account is deactivated please contact support"]);

    }
    let pubEvent:UserLoggingInEvent ;
    const otp =otpGenerator()
    existingUser.set(
        {otpResister:otp,
            otpExpiryDate:Date.now()+ 10 * 60 * 1000})
    existingUser.save();

    pubEvent = {
        subject:Subjects.userLoggingIn,
        data:{
            email,
            name:existingUser.name,
            otp,
            userId:existingUser!.id
        }
    }


    sendSuccess(res,200,{
        userId: existingUser.id
    })

    await new UserLoggingInPublisher(natsWrapper.client).publish(pubEvent['data'])

}



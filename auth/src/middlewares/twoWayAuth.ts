import express, {NextFunction, Request, Response} from "express";

import mongoose from "mongoose";
import {BadRequestError} from "../errors/badRequestError";
import {sendSuccess} from "../utils/sendSuccess";
import {User} from "../models/user";
import {jwtGenerator} from "../utils/jwtGenerator";
import {userAgentParser} from "../utils/userAgentParser";
import {NotAuthorizedError} from "../errors/notAuthorizedError";
import {PasswordManger} from "../utils/passwordManger";
import {Subjects} from "../events/Subjects";
import {Event} from "../models/events";
import {UserCreatedPublisher} from "../events/publishers/userCreatedPublisher";
import {natsWrapper} from "../nats/nats-wrapper";
import {UserCreatedEvent} from "../events/eventTypes/userCreatedEvent";
import {otpGenerator} from "../utils/otpGenerator";
import {UserLoggingInPublisher} from "../events/publishers/userLoggingInPublisher";
import {UserLoggingInEvent} from "../events/eventTypes/userLoggingInEvent";



export const twoWayAuth = async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password,rememberMe} = req.body;
    let eventId:string;
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
    let pubEvent:UserLoggingInEvent ;
    const otp =otpGenerator()
    existingUser.set(
        {otpNumber:otp,
            otpExpiryDate:Date.now()+ 2 * 60 * 1000})
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
    const  event = Event.build({
        subject: Subjects.userLoggingIn,
        sent: false,
        data:pubEvent["data"]
    })
    event.save()
    eventId= event.id;

    sendSuccess(res,201,{
        userId: existingUser.id
    })

    await new UserLoggingInPublisher(natsWrapper.client).publish(pubEvent['data'])
    const savedEvent = await Event.findById(eventId);
    if (savedEvent){
        savedEvent.set({sent:true});
        await savedEvent.save();
    }

}



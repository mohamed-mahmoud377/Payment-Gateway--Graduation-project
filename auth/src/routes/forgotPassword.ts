import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validateRequest";
import {User} from "../models/user";

import {PasswordManger} from "../utils/passwordManger";
import {jwtGenerator} from "../utils/jwtGenerator";
import {sendSuccess} from "../utils/sendSuccess";
import {NotAuthorizedError} from "../errors/notAuthorizedError";
import {BadRequestError} from "../errors/badRequestError";
import {Subjects} from "../events/Subjects";
import {Event} from "../models/events";
import {UserCreatedPublisher} from "../events/publishers/userCreatedPublisher";
import {natsWrapper} from "../nats/nats-wrapper";
import {UserForgotPasswordPublisher} from "../events/publishers/userForgotPasswordPublisher";

const router = express.Router();

router.post('/forgot-password',[
    body('email')
        .isEmail()
        .withMessage("Invalid request.")
        .notEmpty()
        .withMessage('Invalid request.'),

],validateRequest,async (req:Request ,res:Response)=>{
    const {email} = req.body;
    // making sure that the email is valid and exists
    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw new BadRequestError()
    }
    //generate a rest token
    const resetToken = existingUser.createAndAssignPasswordResetToken();
    existingUser.save(); // save the token to and expires time the database
    const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    //create the event

    const pubEvent = {
        subject:Subjects.userCreated,
        data:{
            email:existingUser.email,
            userId:existingUser.id,
            name:existingUser.name,
            url:resetURL
        }
    }
    // save the event to database
    const  event = Event.build({
        subject: Subjects.userForgotPassword,
        sent: false,
        data:pubEvent["data"]
    })
    event.save()

    sendSuccess(res,200,{})

    await new UserForgotPasswordPublisher(natsWrapper.client).publish(pubEvent['data'])
    const savedEvent = await Event.findById(event.id);
    if (savedEvent){
        savedEvent.set({sent:true});
        await savedEvent.save();
    }

})

export { router as forgotPassword}
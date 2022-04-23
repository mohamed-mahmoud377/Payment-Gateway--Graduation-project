import express, {Request, Response} from "express";
import {body} from "express-validator";
import {Admin} from "../models/admin";
import {
    NotAuthorizedError,
    PasswordManger,
    sendSuccess,
    Subjects,
    UserLoggingInEvent,
    validateRequest
} from "@hashcash/common";
import {otpGenerator} from "../utils/otpGenerator";
import {natsWrapper} from "../nats/nats-wrapper";
import {UserLoggingInPublisher} from "../events/publishers/userLoggingInPublisher";
import {Event} from "../models/events";

const router = express.Router();

router.post('/login',[ body('email')
    .isEmail()
    .withMessage("Invalid credentials.")
    .notEmpty()
    .withMessage('Invalid credentials.'),
    body('password')
        .notEmpty()
        .withMessage('Invalid credentials.'),
],validateRequest,async (req:Request,res:Response)=>{
   //    const add  = new Admin({
   //        email:"mohamedmahmoud3776@gmail.com",
   //        password:'admin'
   //    })
   // await add.save();
        let eventId:string;
        // getting email and password out for body
        const {email,password}= req.body;
        //checking if email actually there
        const existingAdmin = await Admin.findOne({email})
        console.log('fuckyeah')
        if (!existingAdmin){
            throw new NotAuthorizedError(['Invalid credentials']);
        }
    console.log('here')
        //seeing if password is matching
    const passwordMatch = await PasswordManger.compare(existingAdmin.password,password);
    if (!passwordMatch){
        throw new NotAuthorizedError(["Invalid Credentials"]);
    }
    let pubEvent:UserLoggingInEvent ;
    const otp =otpGenerator()
    // setting the otp in the admin doc
    existingAdmin.set(
        {otpNumber:otp,
            otpExpiryDate:Date.now()+ 2 * 60 * 1000})
    existingAdmin.save();

    // setting up the event what we are going to publish
    pubEvent = {
        subject:Subjects.userLoggingIn,
        data:{
            email,
            name:existingAdmin.name,
            otp,
            userId:existingAdmin!.id
        }
    }
    //build the event and saving it to database
    const  event = Event.build({
        subject: Subjects.userLoggingIn,
        sent: false,
        data:pubEvent["data"]
    })
    event.save()
    eventId= event.id;

    sendSuccess(res,200,{userId:existingAdmin.id})

    // sending the event via nats
    await new UserLoggingInPublisher(natsWrapper.client).publish(pubEvent['data'])
    // here we are sure that the event has been published
    const savedEvent = await Event.findById(eventId);
    // let's mark it as sent
    if (savedEvent){
        savedEvent.set({sent:true});
        await savedEvent.save();
    }

})

export {
    router as loginRoute
}
import express, {Request, Response} from "express";
import {body, param, query} from "express-validator";
import {sendSuccess} from  "@hashcash/common";
import {validateRequest} from  "@hashcash/common";
import {User} from "../models/user";
import mongoose from "mongoose";
import {BadRequestError} from "@hashcash/common";
import {Subjects} from "@hashcash/common";
import {EventModel} from "@hashcash/common";
import {UserCreatedPublisher} from "../events/publishers/userCreatedPublisher";
import {natsWrapper} from "../nats/nats-wrapper";
import {UserCreatedEvent} from  "@hashcash/common";
import {otpGenerator} from "../utils/otpGenerator";
import {UserLoggingInEvent} from  "@hashcash/common";
import {UserLoggingInPublisher} from "../events/publishers/userLoggingInPublisher";

const router  = express.Router()


router.get('/resend-otp/:userId/',[

    query('sendFor')
        .notEmpty()
        .withMessage("sendFor must be provided.")

],validateRequest,async (req:Request,res:Response)=>{
   const  {userId} = req.params;
   const  {sendFor} = req.query
    if (sendFor!=='signup'&& sendFor!=='login'){
        throw new  BadRequestError(['sendFor query is wrong']);
    }
   if (!mongoose.isValidObjectId( userId)){
        throw new  BadRequestError(['invalid input']);
    }
   const user = await User.findById(userId);
   if (!user){
       throw new  BadRequestError(['invalid input']);
   }
   let eventId ;

   const otp = otpGenerator()



    user.save()
   if (sendFor==='signup'){
       user.set({otpVerify:otp, otpExpiryDate:Date.now()+ 10 * 60 * 1000})
     const   pubEvent :UserCreatedEvent= {
           subject:Subjects.userCreated,
           data:{
               email:user.email,
               name:user.name,
               otp,
               userId:user.id
           }
       }
       const  event =EventModel.build({
           subject: Subjects.userCreated,
           sent: false,
           data:pubEvent["data"]
       })
       event.save()
       eventId= event.id;


       sendSuccess(res)


       await new UserCreatedPublisher(natsWrapper.client).publish(pubEvent['data'])
       const savedEvent = await EventModel.findById(eventId);
       if (savedEvent){
           savedEvent.set({sent:true});
           await savedEvent.save();
       }
       return;

   }
   if (sendFor==='login'){
       user.set({otpResister:otp, otpExpiryDate:Date.now()+ 10 * 60 * 1000})
      const  pubEvent:UserLoggingInEvent = {
           subject:Subjects.userLoggingIn,
           data:{
               email:user.email,
               name:user.name,
               otp,
               userId:user.id
           }
       }
       const  event =EventModel.build({
           subject: Subjects.userLoggingIn,
           sent: false,
           data:pubEvent["data"]
       })
       event.save()
       eventId= event.id;


       sendSuccess(res)

       await new UserLoggingInPublisher(natsWrapper.client).publish(pubEvent['data'])
       const savedEvent = await EventModel.findById(eventId);
       if (savedEvent){
           savedEvent.set({sent:true});
           await savedEvent.save();
       }
       return;
   }

     throw new BadRequestError();

})


export {router as otpResendRoute}
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
import {EventModel} from "@hashcash/common";
import {jwtGenerator} from "../utils/jwtGenerator";
import {userAgentParser} from "../utils/userAgentParser";

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

        if (!existingAdmin){
            throw new NotAuthorizedError(['Invalid credentials']);
        }
        //seeing if password is matching
    const passwordMatch = await PasswordManger.compare(existingAdmin.password,password);
    if (!passwordMatch){
        throw new NotAuthorizedError(["Invalid Credentials"]);
    }

    if (process.env.NODE_ENV==='development'){
        // now that the otp is right lets create the access and refresh token
        const payload = {
            id:existingAdmin.id,
            role:'admin',
        }

        const {accessToken} = jwtGenerator(payload,Number(process.env.JWT_ADMIN_EXPIRES_IN!)); //number because jwt lib if it was string it will be in milli sec


        //create a login session for the user
        let  {browser,os,device} = userAgentParser(req.get('user-agent')!);
        if (device)
            os= os +" - "+device
        existingAdmin.loginSession.push({
            ip:req.ip,
            browser:browser,
            device:os,

        })

        await existingAdmin.save();


        // send the access token as a cookie too
        req.session= {jwt:accessToken};
         return sendSuccess(res,200,{
            accessToken,
        })

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
    const  event = EventModel.build({
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
    const savedEvent = await EventModel.findById(eventId);
    // let's mark it as sent
    if (savedEvent){
        savedEvent.set({sent:true});
        await savedEvent.save();
    }

})

export {
    router as loginRoute
}
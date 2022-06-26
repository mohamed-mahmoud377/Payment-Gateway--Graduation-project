import express, {Request, Response} from 'express';
import {requireAuth, sendSuccess} from "@hashcash/common";
import {requireAuthForCurrent} from "../middlewares/rquireAuthforcurrent";




const router = express.Router();


router.get('/current-user',requireAuth({requireEmailVerification:false,requireVerifiedMerchant:false}),(req:Request ,res:Response)=>{
    sendSuccess(res,200,{currentUser:req.currentUser})


})

export { router as currentUserRoute}
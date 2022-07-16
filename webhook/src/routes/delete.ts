import express, {Request, Response} from "express";
import {body} from "express-validator";
import {WebHook} from "../models/webHook";
import {NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";

const router = express.Router();


router.delete("/",requireAuth(),async (req:Request,res:Response)=>{
   // write code here
    const webhook = await WebHook.deleteOne({ merchantId:req.currentUser?.id})
    sendSuccess(res,204);

})
export{
    router as deleteRoute
}
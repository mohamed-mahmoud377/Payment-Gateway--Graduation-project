import express, {Request, Response} from "express";
import {body} from "express-validator";
import {WebHook} from "../models/webHook";
import {NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";

const router = express.Router();


router.get("/",requireAuth(),async (req:Request,res:Response)=>{
    const webhook = await WebHook.findOne({merchantId:req.currentUser?.id})
    if (!webhook){
        throw new NotFoundError();
    }

    sendSuccess(res,201,{webhook});

})
export{
    router as indexRoute
}
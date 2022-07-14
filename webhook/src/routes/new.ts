import express, {Request, Response} from "express";
import {body} from "express-validator";
import {WebHook} from "../models/webHook";
import {BadRequestError, NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";

const router = express.Router();


router.post('/add',[
    body('url')
        .notEmpty()
        .withMessage('url must be provided'),
],validateRequest,requireAuth(),async (req:Request,res:Response)=>{
    const exsitingWebhook = await WebHook.findOne({merchantId:req.currentUser?.id})
    if (exsitingWebhook){
        throw new BadRequestError(['Your already have a web hook']);
    }
    const webhook = await WebHook.create({...req.body,
        merchantId:req.currentUser?.id
    });

    sendSuccess(res,201,{webhook});

})
export{
    router as newRoute
}
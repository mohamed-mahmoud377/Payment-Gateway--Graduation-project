import express, {Request, Response} from "express";
import {NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {Payment} from "../models/payment";
import {PaymentStatus} from "../types/paymentStatus";
import {query} from "express-validator";

const router = express.Router();


router.get("/my-balance",[
    query('isLive')
        .notEmpty()
        .withMessage("isLive query param must be provided")
],validateRequest,requireAuth(),async (req:Request,res:Response)=>{
    const {isLive} = req.query;
    const balance = await Payment.aggregate().match({
        merchantId:req.currentUser!.id,status:PaymentStatus.SUCCEEDED
    }).group({
        _id:"$isLive",
        balance:{
            $sum:'$totalAmount'
        }
    })


    sendSuccess(res,201,{balance});

})
export{
    router as getBalanceRoute
}
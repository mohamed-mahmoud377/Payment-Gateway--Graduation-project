import express, {Request, Response} from "express";
import {APIFilter, ForbiddenError, NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {Payment} from "../models/payment";
import {query} from "express-validator";

const router = express.Router();


router.get('/payments/:id',requireAuth(),async (req:Request,res:Response)=>{
    const {id} = req.params;
    const payment = await Payment.findById(id);
    if (!payment)
        throw new NotFoundError();

    if (payment.merchantId!==req.currentUser?.id)
        throw new ForbiddenError();

    sendSuccess(res,200,{payment});

})


export{
    router as getPaymentRoute
}
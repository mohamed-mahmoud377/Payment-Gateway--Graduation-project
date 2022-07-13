import express, {Request, Response} from "express";
import {APIFilter, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {Payment} from "../models/payment";
import {query} from "express-validator";

const router = express.Router();


router.get('/payments',[
    query('isLive')
        .notEmpty()
        .withMessage("isLive query param must be provided")
],validateRequest,requireAuth(),async (req:Request,res:Response)=>{
    const {isLive} = req.query;
    const features = new APIFilter(Payment.find({merchantId:req.currentUser?.id}),req.query).filter().sort().limitFields().paginate();

    const features2 = new APIFilter(Payment.find({merchantId:req.currentUser?.id}),req.query).filter().sort().limitFields();
    const paymentsNumber =await features2.query.countDocuments();


    const payments = await features.query;

    sendSuccess(res,200,{paymentsNumber,payments},payments.length)
})


export{
    router as getPaymentsRoute
}
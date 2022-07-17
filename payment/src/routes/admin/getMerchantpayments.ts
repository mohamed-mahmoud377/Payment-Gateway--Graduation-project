import express, {Request, Response} from "express";
import {APIFilter, requireAuth, restrictTo, Roles, sendSuccess, validateRequest} from "@hashcash/common";
import {query} from "express-validator";
import {Payment} from "../../models/payment";

const router = express.Router();


router.get('/admin/payments/:merchantId',[
    query('isLive')
        .notEmpty()
        .withMessage("isLive query param must be provided"),
],validateRequest,requireAuth(),restrictTo([Roles.ADMIN]),async (req:Request,res:Response)=>{
    const {isLive} = req.query;
    const {merchantId} = req.params;
    const features = new APIFilter(Payment.find({merchantId}),req.query).filter().sort().limitFields().paginate();

    const features2 = new APIFilter(Payment.find({merchantId}),req.query).filter().sort().limitFields();
    const paymentsNumber =await features2.query.countDocuments();


    const payments = await features.query;

    sendSuccess(res,200,{paymentsNumber,payments},payments.length)
})


export{
    router as getMerchantPayments
}
import express, {Request, Response} from "express";
import {NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {Payment} from "../models/payment";
import {PaymentStatus} from "../types/paymentStatus";
import {query} from "express-validator";

const router = express.Router();


router.get("/today-stats/payments",[
    query('isLive')
        .notEmpty()
        .withMessage("isLive query param must be provided")
],requireAuth(),async (req:Request,res:Response)=>{
    const {isLive} = req.query;
    const day = Number(new Date(Date.now()).getDate());
    const month=Number( new Date(Date.now()).getMonth());
    const year = Number(new Date(Date.now()).getFullYear());
    const start = new Date(year,month,day,0,0,0,0);
    const end = new Date(year,month,day,23,59,59,999);

    let bool = isLive==='true'
    const balance = await Payment.aggregate().match({
        merchantId:req.currentUser!.id,isLive:bool,status:PaymentStatus.SUCCEEDED,
        createdAt:{
            $gte:new Date (start),
             $lte: new Date(end)
        }

    }).group({
        _id:"$status",
        PaymentsNumber:{
            $sum: 1
        },
        balance:{
            $sum:'$totalAmount'
        },


    })


    sendSuccess(res,200,balance);

})
export{
    router as paymentStatsRoute
}
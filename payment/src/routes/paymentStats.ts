import express, {Request, Response} from "express";
import {NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {Payment} from "../models/payment";
import {PaymentStatus} from "../types/paymentStatus";
import {query} from "express-validator";

const router = express.Router();


router.get("/stats/payments",[
    query('isLive')
        .notEmpty()
        .withMessage("isLive query param must be provided")
],requireAuth(),async (req:Request,res:Response)=>{
    const {isLive} = req.query;
    const day = new Date().getDay();
    const month= new Date().getMonth();
    const year = new Date().getFullYear();
    const date = `${year}-${month}-${day}`;
    console.log(date);
    let bool = isLive==='true'
    const balance = await Payment.aggregate().match({
        merchantId:req.currentUser!.id,isLive:bool,status:PaymentStatus.SUCCEEDED,
        createdAt:{

        $lte: new Date(date)
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
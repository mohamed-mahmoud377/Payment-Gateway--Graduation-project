import express, {Request, Response} from "express";
import {APIFilter, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {query} from "express-validator";
import {Customer} from "../models/customer";

const router = express.Router();


router.get('/customers',[
    query('isLive')
        .notEmpty()
        .withMessage("isLive query param must be provided")
],validateRequest,requireAuth(),async (req:Request,res:Response)=>{
    const {isLive} = req.query;
    const features = new APIFilter(Customer.find({merchantId:req.currentUser?.id}),req.query).filter().sort().limitFields().paginate();

    const features2 = new APIFilter(Customer.find({merchantId:req.currentUser?.id}),req.query).filter().sort().limitFields();
    const customersNumber =await features2.query.countDocuments();


    const customers = await features.query;

    sendSuccess(res,200,{customersNumber,customers},customers.length)
})


export{
    router as indexRoute
}
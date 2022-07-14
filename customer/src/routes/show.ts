import express, {Request, Response} from "express";
import {APIFilter, ForbiddenError, NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";

import {query} from "express-validator";
import {Customer} from "../models/customer";

const router = express.Router();


router.get('/customers/:id',requireAuth(),async (req:Request,res:Response)=>{
    const {id} = req.params;
    const customer = await Customer.findOne({merchantId:req.currentUser?.id,clientReferenceId:id});
    if (!customer)
        throw new NotFoundError();


    sendSuccess(res,200,{customer});

})


export{
    router as showRoute,
}
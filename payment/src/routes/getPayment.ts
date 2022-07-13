import express, {Request, Response} from "express";
import {APIFilter, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {Payment} from "../models/payment";
import {query} from "express-validator";

const router = express.Router();


router.get('/payments/:id',requireAuth(),async (req:Request,res:Response)=>{

})


export{
    router as getPaymentRoute
}
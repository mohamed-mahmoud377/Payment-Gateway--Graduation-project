import express, {Request,Response} from "express";
import {body, CustomValidator} from "express-validator";
import {validateRequest} from "../middlewares/validateRequest";
import {sendSuccess} from "../utils/sendSuccess";


const router =express.Router();




router.post('/check-password',[
    body('password').trim().notEmpty().withMessage("password field can not be empty").bail()
        .isLength({min:10,max:100}).withMessage('Password must be more than 10 characters.')
        .bail()


],validateRequest,async (req:Request,res:Response)=>{
 sendSuccess(res,200,{});
})


export {router as checkPasswordRoute}
import express, {Request,Response} from "express";
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validateRequest";

const router =express.Router();


router.post('/check-password',[
    body('password').trim().notEmpty().withMessage("password field can not be empty").bail()
        .isLength({min:8,max:100}).withMessage('Password must be more than 10 characters.')
        .bail()
        .isStrongPassword()
        .withMessage('Your password is not strong enough.')

],validateRequest,async (req:Request,res:Response)=>{
    console.log('fuck')
    console.log(req.body)
    res.send('hsd      fi')

})


export {router as checkPasswordRoute}
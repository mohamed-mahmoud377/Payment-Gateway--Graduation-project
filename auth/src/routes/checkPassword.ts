import express, {Request,Response} from "express";
import {body, CustomValidator} from "express-validator";
import {BadRequestError, validateRequest} from "@hashcash/common";
import {sendSuccess} from "@hashcash/common";
import {generateFackUsers} from "../utils/generateFackUsers";
import {User} from "../models/user";


const router =express.Router();

router.post('/check-password',[
    body('password').trim().notEmpty().withMessage("password field can not be empty")


],validateRequest,async (req:Request,res:Response)=>{
  const {password} =req.body;
  if (password.length<11)
      throw new BadRequestError(["Password must be more than or equal to 10 characters"],200);

 sendSuccess(res,200,{});
})


export {router as checkPasswordRoute}
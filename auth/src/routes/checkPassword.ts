import express, {Request,Response} from "express";
import {body, CustomValidator} from "express-validator";
import {BadRequestError, ErrorCodes, validateRequest} from "@hashcash/common";
import {sendSuccess} from "@hashcash/common";
import {generateFackUsers} from "../utils/generateFackUsers";
import {User} from "../models/user";


const router =express.Router();

router.post('/check-password',[



],validateRequest,async (req:Request,res:Response)=>{
  const {password} =req.body;
    if (!password){
        throw new BadRequestError(["Password field must be provided"]);
    }
  if (password.length<10)
      return res.status(200).send({
          status:"fail",
          errorCode:ErrorCodes.badRequest,
          errors: ["Password must be less than or equal to 10 characters"],

      })

 sendSuccess(res,200,{});
})


export {router as checkPasswordRoute}
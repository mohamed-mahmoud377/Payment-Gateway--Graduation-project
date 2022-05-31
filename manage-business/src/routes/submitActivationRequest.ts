import express, {Request, Response} from "express";
import {BadRequestError, requireAuth, restrictTo, Roles, sendSuccess, validateRequest} from "@hashcash/common";
import {body} from "express-validator";
import {validateBankAccount, validateBusinessInfo, validateBusinessOwner} from "../utils/validator";
import {BusinessActivationRequest} from "../models/businessActivationRequest";
import {businessInfoAttrs} from "../models/businessInfo";

const router = express.Router();


router.post("/submit-activation-request",requireAuth,restrictTo([Roles.MERCHANT]),[
    body("businessInfo")
        .notEmpty()
        .withMessage("'businessInfo' field must be provided"),
    body("businessOwner")
        .notEmpty()
        .withMessage("'businessOwner' field must be provided"),
    body("'bankAccount' field must be provided")

],validateRequest,async (req:Request,res:Response)=>{
   const  {businessInfo,businessOwner,bankAccount} = req.body;
    const errors:string[]= []
  // validating all the inputs to make sure that all the entered data is right
    errors.push(...validateBusinessInfo(businessInfo));
    errors.push(...validateBusinessOwner(businessOwner));
    errors.push(...validateBankAccount(bankAccount));

    // if there are any errors throw a bad request error
    if (errors.length>0)
        throw new BadRequestError(errors);

    // creating the activation request from all the provided data
    const existingBusinessActivationRequest =await BusinessActivationRequest.findOne({userId:req.currentUser?.id!})
    if (existingBusinessActivationRequest){
        throw  new BadRequestError(["You have already submitted you application"])
    }
    const businessActivationRequest  =  BusinessActivationRequest.build({
        BusinessApplication: {
            businessInfo,
            businessOwner,
            bankAccount
        }, status: "pending", userId: req.currentUser?.id!

    })

    await businessActivationRequest.save();


    sendSuccess(res,201,businessActivationRequest);
})

export {
    router as submitActivationRequestRoute
}
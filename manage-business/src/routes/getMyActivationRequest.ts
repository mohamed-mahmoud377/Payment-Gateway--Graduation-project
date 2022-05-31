import express, {Request, Response} from "express";
import {NotFoundError, requireAuth, restrictTo, Roles, sendSuccess} from "@hashcash/common";
import {BusinessActivationRequest} from "../models/businessActivationRequest";

const router = express.Router();


router.get('/activation-request',requireAuth,restrictTo([Roles.MERCHANT]),async (req:Request,res:Response)=>{

    const userId = req.currentUser?.id!;
    const activationRequest = await BusinessActivationRequest.findOne({userId});
    if (!activationRequest){
        throw new NotFoundError();
    }

    sendSuccess(res,200,activationRequest)

})

export {
    router as getMyActivationRequestRoute
}
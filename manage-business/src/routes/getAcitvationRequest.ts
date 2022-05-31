import express, {Request, Response} from "express";
import {NotFoundError, requireAuth, restrictTo, Roles, sendSuccess} from "@hashcash/common";
import {BusinessActivationRequest} from "../models/businessActivationRequest";
import mongoose from "mongoose";

const router = express.Router();


router.get('/activation-requests/:id',requireAuth,restrictTo([Roles.ADMIN]),async (req:Request,res:Response)=>{
    const {id} = req.params;
    if (!mongoose.isValidObjectId(id))
        throw new NotFoundError(["This activation request does not exists"])
    
    const activationRequest = await BusinessActivationRequest.findById(id);

    if (!activationRequest)
        throw new NotFoundError(["This activation request does not exists"])


    sendSuccess(res,200,activationRequest)

})

export {
    router as getActivationRequestRoute
}
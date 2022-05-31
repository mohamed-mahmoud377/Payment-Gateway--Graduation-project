import express, {Request, Response} from "express";
import {NotFoundError, requireAuth, restrictTo, Roles, sendSuccess} from "@hashcash/common";
import {BusinessActivationRequest} from "../models/businessActivationRequest";

const router = express.Router();


router.get('/activation-requests',requireAuth,restrictTo([Roles.ADMIN]),async (req:Request,res:Response)=>{

    const activationRequest = await BusinessActivationRequest.find();

    sendSuccess(res,200,activationRequest)

})

export {
    router as getAllActivationRequestsRoute
}
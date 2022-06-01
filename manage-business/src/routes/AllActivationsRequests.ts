import express, {Request, Response} from "express";
import {APIFilter, NotFoundError, requireAuth, restrictTo, Roles, sendSuccess} from "@hashcash/common";
import {BusinessActivationRequest} from "../models/businessActivationRequest";

const router = express.Router();


router.get('/activation-requests',requireAuth,restrictTo([Roles.ADMIN]),async (req:Request,res:Response)=>{

    const filters  = new APIFilter(BusinessActivationRequest.find({}),req.query).filter().sort().limitFields().paginate();

    const activationRequest = await filters.query;
    const activationRequestNumber= await BusinessActivationRequest.countDocuments();

    sendSuccess(res,200,activationRequest,activationRequestNumber)

})

export {
    router as getAllActivationRequestsRoute
}
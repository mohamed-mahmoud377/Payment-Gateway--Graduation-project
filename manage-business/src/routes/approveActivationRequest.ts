import express, {Request, Response} from "express";
import {BadRequestError, NotFoundError, requireAuth, restrictTo, Roles, sendSuccess} from "@hashcash/common";
import {BusinessActivationRequest} from "../models/businessActivationRequest";
import {RequestStatus} from "../types/RequestStatus";
import mongoose from "mongoose";
import {merchantActivatedPublisher} from "../events/publishers/merchantActivatedPublisher";
import {natsWrapper} from "../nats/nats-wrapper";

const router = express.Router();


router.patch('/activation-requests/approve/:id',requireAuth(),restrictTo([Roles.ADMIN]),async (req:Request,res:Response)=>{
    const {id} = req.params;
    if (!mongoose.isValidObjectId(id))
        throw new NotFoundError(["This activation request does not exists"])

    const activationRequest = await BusinessActivationRequest.findById(id);

    if (!activationRequest)
        throw new NotFoundError(["This activation request does not exists"])
    if (activationRequest.status!==RequestStatus.PENDING){
        throw new BadRequestError(['You are trying to approved an application that has been already reviewed']);
    }
    activationRequest.status= RequestStatus.APPROVED;
    activationRequest.reviewedBy= req.currentUser?.id!;
    activationRequest.reviewDate= new Date(Date.now());
    await activationRequest.save();

    await new  merchantActivatedPublisher(natsWrapper.client).publish({
        activated: true, activationRequestId: activationRequest.id,
        activatedBy:req.currentUser!.id!,
        userId:activationRequest.userId,
        userEmail:activationRequest.userEmail
    })


    sendSuccess(res,200,activationRequest)

})

export {
    router as approveActivationRequestRoute
}
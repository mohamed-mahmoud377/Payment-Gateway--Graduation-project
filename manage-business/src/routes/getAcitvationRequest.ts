import express, {Request, Response} from "express";
import {HandlerFactory, NotFoundError, requireAuth, restrictTo, Roles, sendSuccess} from "@hashcash/common";
import {BusinessActivationRequest, BusinessActivationRequestDoc} from "../models/businessActivationRequest";
import mongoose from "mongoose";

const router = express.Router();


router.get('/activation-requests/:id',requireAuth(),restrictTo([Roles.ADMIN]),new HandlerFactory<BusinessActivationRequestDoc>().getOne(BusinessActivationRequest))


export {
    router as getActivationRequestRoute
}
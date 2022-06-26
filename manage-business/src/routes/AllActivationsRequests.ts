import express, {Request, Response} from "express";
import {APIFilter, HandlerFactory, NotFoundError, requireAuth, restrictTo, Roles, sendSuccess} from "@hashcash/common";
import {BusinessActivationRequest, BusinessActivationRequestDoc} from "../models/businessActivationRequest";

const router = express.Router();


router.get('/activation-requests',requireAuth(),restrictTo([Roles.ADMIN]),new HandlerFactory<BusinessActivationRequestDoc>().getAll(BusinessActivationRequest))

export {
    router as getAllActivationRequestsRoute
}
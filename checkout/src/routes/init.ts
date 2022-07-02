import express, {NextFunction, Request, Response} from "express";
import {body} from "express-validator";
import {BadRequestError, sendSuccess, validateRequest} from "@hashcash/common";
import {CheckoutSession} from "../models/checkoutSession";

const router = express.Router();

router.get("/init/:hash",async (req:Request, res:Response, next:NextFunction) => {

    const {hash} = req.params;
    const checkout = await CheckoutSession.findOne({hash});

    if (!checkout)
        throw new BadRequestError(['This checkout session link is invalid']);

    if (checkout.paidFor)
        throw new BadRequestError(["This payment has already been made"]);

    if (checkout.expiresAt< new Date(Date.now()))
        throw new BadRequestError(['This checkout link has expired']);



    sendSuccess(res,200,{checkout})

})

export {
    router as initRoute
}
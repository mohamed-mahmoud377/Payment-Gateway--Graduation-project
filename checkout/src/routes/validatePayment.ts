import express, {NextFunction, Request, Response} from "express";
import {body} from "express-validator";
import {BadRequestError, NotFoundError, sendSuccess, validateRequest} from "@hashcash/common";
import {CheckoutSession} from "../models/checkoutSession";
import {CheckoutStatus} from "../types/chckoutStatus";


const router = express.Router();

router.post("/validate",[
    body('checkoutId')
        .notEmpty()
        .withMessage("checkoutId is not provided")
],validateRequest,async (req:Request, res:Response, next:NextFunction) => {
    const {checkoutId} = req.body;
    const checkout= await   CheckoutSession.findById(checkoutId);
    if (!checkout)
        throw new NotFoundError(['the provided checkoutSession does not exists']);

    if (checkout.status===CheckoutStatus.PAID_FAILED){
       return res.status(402).send({
           status: "fail",
           errorCode: 100,
           errors: [
               checkout.failingReason
           ]
       })
    }
    if (checkout.status===CheckoutStatus.PAID_SUCCEEDED){
        return sendSuccess(res);
    }
    if (checkout.status===CheckoutStatus.PENDING_PAYMENT_REQUEST) {
        return sendSuccess(res, 102);
    }

})

export {
    router as ValidatePaymentRoute
}
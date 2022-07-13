import express, {NextFunction, Request, Response} from "express";
import {body} from "express-validator";
import {BadRequestError, NotAuthorizedError, NotFoundError, sendSuccess, validateRequest} from "@hashcash/common";
import {CheckoutSession} from "../models/checkoutSession";
import {CheckoutStatus} from "../types/chckoutStatus";
import {InternalServerError} from "@hashcash/common/build/errors/InternalServerError";

const router = express.Router();

router.post("/my-checkout",[

    body('checkoutSession')
        .notEmpty()
        .withMessage("checkoutSession must be provided")
],validateRequest,async (req:Request, res:Response, next:NextFunction) => {
    const {checkoutSession}= req.body;
    let checkout = await CheckoutSession.findById(checkoutSession);

    if (!checkout)
        throw new NotFoundError(['the provided checkoutSession does not exists']);

    if (checkout.status===CheckoutStatus.PENDING_APIKEY_AUTH)
        throw new InternalServerError(["your request has not been processed yet, Please try again "]);

    if (checkout.status===CheckoutStatus.INVALID_APIKEY)
        throw new NotAuthorizedError(['Invalid secret key from the previous step']);

    if (checkout.expiresAt< new Date(Date.now()))
        throw new BadRequestError(['the checkout session you are looking for has been expired']);

    if (checkout.status===CheckoutStatus.PAID_SUCCEEDED)
        throw new BadRequestError(['the checkout session you are looking had already been paid for']);



    sendSuccess(res,200,checkout.showForUser());
})

export {
    router as getCheckoutSessionRoute
}
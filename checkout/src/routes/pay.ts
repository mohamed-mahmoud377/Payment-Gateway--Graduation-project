import express, {NextFunction, Request, Response} from "express";
import {body} from "express-validator";
import {BadRequestError, NotAuthorizedError, NotFoundError, sendSuccess, validateRequest} from "@hashcash/common";
import {CheckoutSession} from "../models/checkoutSession";
import {CheckoutStatus} from "../types/chckoutStatus";
import {InternalServerError} from "@hashcash/common/build/errors/InternalServerError";
import {PaymentRequestPublisher} from "../events/publishers/paymentRequestPublisher";
import {natsWrapper} from "../nats/nats-wrapper";

const router = express.Router();

router.post("/pay",[
    body('panNumber')
        .notEmpty()
        .withMessage("Pan number must be provided"),
    body("month")
        .notEmpty()
        .withMessage('month must be provided'),
    body("year")
        .notEmpty()
        .withMessage('year must be provided'),
    body("cardHoldName")
        .notEmpty()
        .withMessage('card hold name must be provided'),
    body('CVC')
        .notEmpty()
        .withMessage("CVC number must be provided"),
    body('checkoutId')
        .notEmpty()
        .withMessage("checkoutId must be provided")

],validateRequest,async (req:Request, res:Response, next:NextFunction) => {

    const {pan,year,month,CVC,cardHoldName, checkoutId} = req.body;

    const checkout =await CheckoutSession.findById(checkoutId);
    if (!checkout)
        throw new NotFoundError();

    if (!checkout)
        throw new NotFoundError(['the provided checkoutSession does not exists']);

    if (checkout.status===CheckoutStatus.PENDING_APIKEY_AUTH)
        throw new InternalServerError(["your request has not been processed yet, Please try again "]);

    if (checkout.status===CheckoutStatus.INVALID_APIKEY)
        throw new NotAuthorizedError(['Invalid secret key from the previous step']);

    if (checkout.expiresAt< new Date(Date.now()))
        throw new BadRequestError(['the checkout session you are looking for has been expired']);

    if (checkout.status===CheckoutStatus.PAID_FOR)
        throw new BadRequestError(['the checkout session you are looking had already been paid for']);

    await new PaymentRequestPublisher(natsWrapper.client).publish({
        CVC, checkoutId, month, pan, totalAmount:checkout.amountTotal, year, cardHoldName})

    sendSuccess(res);








})

export {
    router as payRoute
}
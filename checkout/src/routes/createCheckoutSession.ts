import express, {NextFunction, Request, Response} from "express";
import {body} from "express-validator";
import {createCheckoutValidator} from "../validators/validateCreateCheckoutSession";
import {requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {CheckoutSession} from "../models/checkoutSession";
import {checkoutStatus} from "../types/chckoutStatus";

const router = express.Router();

router.post("/",createCheckoutValidator,validateRequest,async (req:Request, res:Response, next:NextFunction) => {
    const {secretKey,items} = req.body;
    //creating checkout session
    const checkoutSession =  await CheckoutSession.create(req.body);

    //changing the status to waiting for apikey authentication
    checkoutSession.status = checkoutStatus.PENDING_APIKEY_AUTH;

    // calculating the total amount of the items the customer wants to buy
    checkoutSession.calculateTotalAmount();

    // determining if it is a live payment or test
    const arr = secretKey.split('_');
    const mode = arr[1];
    mode === "Live" ? checkoutSession.liveMode =true : checkoutSession.liveMode = false;

    // creating checkout link
    checkoutSession.checkoutUrl=`${req.protocol}://${req.hostname}/checkout/pay/${checkoutSession.hash}`;
    
    //saving all of these changes
    await checkoutSession.save();









    sendSuccess(res,201,{
        doc:checkoutSession,
        checkoutSession:checkoutSession.hash
    });
})


export {
    router as createCheckoutSessionRoute
}
import express, {NextFunction, Request, Response} from "express";
import {body} from "express-validator";
import {sendSuccess} from "@hashcash/common";

const router = express.Router();

router.post("/my-checkout",[
    body('checkoutSession')
        .notEmpty()
        .withMessage("checkoutSession must be provided")
],async (req:Request, res:Response, next:NextFunction) => {


    sendSuccess(res,200);
})


export {
    router as getCheckoutSessionRoute
}
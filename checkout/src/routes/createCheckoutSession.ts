import express, {NextFunction, Request, Response} from "express";
import {body} from "express-validator";
import {createCheckoutValidator} from "../utils/validateCreateCheckoutSession";
import {sendSuccess, validateRequest} from "@hashcash/common";

const router = express.Router();

router.post("/",createCheckoutValidator,validateRequest,((req:Request, res:Response, next:NextFunction) => {

    sendSuccess(res,201);
}))
//will be shipped to the common lib
import {Response ,Request,NextFunction} from "express";

import {validationResult} from "express-validator";
import {RequestValidationError} from "../errors/requestValidationError";
import {ErrorCodes} from "../errors/types/errorCodes";



export const validateRequest = (req:Request,res:Response,next:NextFunction)=>{
    // console.log('ehere')
    const errors = validationResult(req);
    // console.log(errors)
    if (!errors.isEmpty()) {
        throw new  RequestValidationError(errors.array(),ErrorCodes.badRequest);
    }
    next();
}
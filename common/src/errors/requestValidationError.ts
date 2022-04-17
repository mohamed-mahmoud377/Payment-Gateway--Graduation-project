import {CustomError} from "./customError";
import {ValidationError} from "express-validator";
import {request} from "express";

export class RequestValidationError extends CustomError{
    errorCode: number;
    errorMessages: string[];
    statusCode: number;
    errors:ValidationError[];
    constructor(errors:ValidationError[],errorCode:number){
        super(errors[0].msg)
        this.statusCode = 400;
        this.errors = errors;
        this.errorMessages = this.errors.map(e => e.msg)
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, CustomError.prototype) // because we are extending a built-in class

    }


}
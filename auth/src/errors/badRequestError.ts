import {CustomError} from "./customError";

export class BadRequestError extends CustomError{
    errorCode: number;
    errorMessages: string[];
    statusCode: number;
    constructor(errorMessages:string[]= ['invalid input '],errorCode:number) {
        super(errorMessages[0]);
        this.statusCode = 400;
        this.errorCode= errorCode;
        this.errorMessages = errorMessages;


        Object.setPrototypeOf(this, CustomError.prototype) // because we are extending a built-in class
    }

}
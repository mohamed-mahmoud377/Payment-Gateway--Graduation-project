import {CustomError} from "./customError";
import {ErrorCodes} from "./types/errorCodes";

export class InternalServerError extends CustomError{
    errorCode: number;
    statusCode: number;
    errorMessages:string [];
    constructor(errorMessages:string[]=['Oops, something went wrong'],codeError:number=ErrorCodes.internalServer) {
        super(errorMessages[0]);
        this.statusCode = 500;
        this.errorCode = codeError;
        this.errorMessages = errorMessages;


        Object.setPrototypeOf(this, CustomError.prototype) // because we are extending a built-in class


    }


}
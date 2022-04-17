import {CustomError} from "./customError";
import {ErrorCodes} from "./types/errorCodes";

export class ForbiddenError extends CustomError{
    errorCode: number;
    statusCode: number;
    errorMessages:string [];
    constructor(errorMessages:string[]=['Forbidden request'],codeError:number=ErrorCodes.unauthorized) {
        super(errorMessages[0]);
        this.statusCode = 403;
        this.errorCode = codeError;
        this.errorMessages = errorMessages;


        Object.setPrototypeOf(this, CustomError.prototype) // because we are extending a built-in class


    }


}
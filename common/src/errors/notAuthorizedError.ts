import {CustomError} from "./customError";
import {ErrorCodes} from "./types/errorCodes";

export class NotAuthorizedError extends CustomError{
    errorCode: number;
    statusCode: number;
    errorMessages:string [];
    constructor(errorMessages:string[]=['Authentication is required to access this route.'],codeError:number=ErrorCodes.unauthorized) {
        super(errorMessages[0]);
        this.statusCode = 401;
        this.errorCode = codeError;
        this.errorMessages = errorMessages;


        Object.setPrototypeOf(this, CustomError.prototype) // because we are extending a built-in class


    }


}
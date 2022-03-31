import {CustomError} from "./customError";
import {ErrorCodes} from "./types/errorCodes";

export class NotFoundError extends CustomError{
    errorCode: number;
    errorMessages: string[];
    statusCode: number;
    constructor(errorMessages:string[]= ['We did not found what you are looking for.'],errorCode:number=ErrorCodes.notFound) {
        super(errorMessages[0]);
        this.statusCode = 404;
        this.errorCode= errorCode;
        this.errorMessages = errorMessages;


        Object.setPrototypeOf(this, CustomError.prototype) // because we are extending a built-in class
    }

}
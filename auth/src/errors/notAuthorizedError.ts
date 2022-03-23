import {CustomError} from "./customError";

export class NotAuthorizedError extends CustomError{
    errorCode: number;
    statusCode: number;
    errorMessages:string [];
    constructor(codeError:number,errorMessages:string[]=['Authentication is required']) {
        super(errorMessages[0]);
        this.statusCode = 401;
        this.errorCode = codeError;
        this.errorMessages = errorMessages;


        Object.setPrototypeOf(this, CustomError.prototype) // because we are extending a built-in class


    }


}
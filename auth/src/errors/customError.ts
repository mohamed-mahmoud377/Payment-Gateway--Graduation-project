export abstract class CustomError extends Error {
    public abstract statusCode: number;
    public abstract errorCode: number;
    public abstract errorMessages:string[];

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype) // because we are extending a built-in class
    }



}
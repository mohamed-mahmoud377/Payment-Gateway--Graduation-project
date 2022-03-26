import {NextFunction, Request, Response} from "express";
import {NotAuthorizedError} from "../errors/notAuthorizedError";
import {ForbiddenError} from "../errors/forbiddenError";

export const  restrictTo = (roles:string[]) => {
// roles is an array
    return (req:Request, res:Response, next:NextFunction) => {
        if (!roles.includes(req.currentUser!.role)) {
            throw new ForbiddenError();
        }

        next();
    };
};

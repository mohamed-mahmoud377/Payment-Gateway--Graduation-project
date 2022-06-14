import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {NotAuthorizedError} from "../errors/notAuthorizedError";
import {ErrorCodes} from "../errors/types/errorCodes";
import {BadRequestError} from "../errors/badRequestError";
import {CustomError} from "../errors/customError";

// sessionId:sessionId.toHexString(),
//     id:user.id,
//     role:user.role,
//     email:user.email,
//     isEmailVerified:true

interface UserPayload{
    sessionId:string,
    isEmailVerified:boolean,
    id:string;
    role:string;
    email:string
    verifiedMerchant:boolean;
}
declare global{ // this let me modify the Request interface and add more prop to it
    namespace Express{
        interface Request{
            currentUser?: UserPayload;
        }
    }
}

export const requireAuth = (req:Request,res:Response,next:NextFunction)=>{

    if (!req.cookies?.jwt){ /// first check if there is req.session then check if there is req.session.jwt
        throw new NotAuthorizedError()
    }
    try{
        req.currentUser = jwt.verify(req.cookies.jwt, process.env.JWT_KEY!) as UserPayload;
        if (!req.currentUser.isEmailVerified){
            throw new BadRequestError(["You can not access this route until you activate you account"]);
        }
    }catch (e) {
        if (e instanceof  jwt.TokenExpiredError){
            throw new NotAuthorizedError(['Invalid access token.'],ErrorCodes.expiredToken);
        }
        if (e instanceof  CustomError){
            throw new NotAuthorizedError(['You can not access this route until you activate you account"'])
        }
        throw new NotAuthorizedError(['Invalid access token'],ErrorCodes.unauthorized);
    }
    if (!req.currentUser)
        throw new NotAuthorizedError()


    next();
}
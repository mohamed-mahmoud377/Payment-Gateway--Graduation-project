import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {BadRequestError, CustomError, ErrorCodes, NotAuthorizedError} from "@hashcash/common";

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

export const requireAuthForCurrent = (req:Request,res:Response,next:NextFunction)=>{

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }else if (req.cookies.jwt){
        token = req.cookies.jwt; // to be able to authenticate via cookie too
    }
    if (!token){ /// first check if there is req.session then check if there is req.session.jwt
        throw new NotAuthorizedError()
    }
    try{
        req.currentUser = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;

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
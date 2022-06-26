import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {NotAuthorizedError} from "../errors/notAuthorizedError";
import {ErrorCodes} from "../errors/types/errorCodes";
import {BadRequestError} from "../errors/badRequestError";
import {CustomError} from "../errors/customError";
import {Payload} from "../types/Payload";
import {HandlerFactory} from "../utils/handlerFactory";
import * as Mongoose from "mongoose";

// sessionId:sessionId.toHexString(),
//     id:user.id,
//     role:user.role,
//     email:user.email,
//     isEmailVerified:true


declare global{ // this let me modify the Request interface and add more prop to it
    namespace Express{
        interface Request{
            currentUser?: Payload;
        }
    }
}

export const requireAuth =(option={
    requireEmailVerification:true,
    requireVerifiedMerchant:false
})=> (req:Request,res:Response,next:NextFunction)=>{

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }else if (req.cookies.jwt){
        token = req.cookies.jwt; // to be able to authenticate via cookie too
    }


    if (!token){ /// first check if there is req.session then check if there is req.session.jwt
        throw new NotAuthorizedError(["Access token is required to access this route"],ErrorCodes.invalidToken)
    }



    try{
        req.currentUser = jwt.verify(token, process.env.JWT_KEY!) as Payload;
        if (option!.requireEmailVerification){
            if (!req.currentUser.isEmailVerified){
                throw new BadRequestError(["You can not access this route until you activate you account"]);
            }
        }
        if (option!.requireVerifiedMerchant){
            if (!req.currentUser.verifiedMerchant){
                throw new BadRequestError(["Only verified merchant can access this route"]);
            }
        }
    }


    catch (e) {
        if (e instanceof  jwt.TokenExpiredError){
            throw new NotAuthorizedError(['Invalid access token.'],ErrorCodes.expiredToken);
        }
        if (e instanceof  CustomError){
            throw new NotAuthorizedError(e.errorMessages,ErrorCodes.unauthorized)
        }
        throw new NotAuthorizedError(['Invalid access token'],ErrorCodes.invalidToken);
    }
    if (!req.currentUser)
        throw new NotAuthorizedError(['Invalid access token'],ErrorCodes.invalidToken)


    next();
}



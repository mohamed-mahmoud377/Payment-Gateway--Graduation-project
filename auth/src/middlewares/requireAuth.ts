import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {NotAuthorizedError} from "../errors/notAuthorizedError";
import {ErrorCodes} from "../errors/types/errorCodes";

interface UserPayload{
    id:string;
    role:string;
    email:string
}
declare global{ // this let me modify the Request interface and add more prop to it
    namespace Express{
        interface Request{
            currentUser?: UserPayload;
        }
    }
}

export const requireAuth = (req:Request,res:Response,next:NextFunction)=>{
    console.log(req.ip)
    console.log(req.ips)
    console.log(req.hostname)
    console.log(req.path)
    console.log(req.protocol)
    console.log(req.headers)
    if (!req.session?.jwt){ /// first check if there is req.session then check if there is req.session.jwt
        throw new NotAuthorizedError()
    }
    try{
        req.currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    }catch (e) {
        if (e instanceof  jwt.TokenExpiredError){
            throw new NotAuthorizedError(['Invalid access token.'],ErrorCodes.expiredToken);
        }
        throw new NotAuthorizedError(['Invalid access token'],ErrorCodes.unauthorized);
    }
    if (!req.currentUser)
        throw new NotAuthorizedError()


    next();
}
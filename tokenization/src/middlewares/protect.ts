import {NextFunction, Request, Response} from "express";
import {NotAuthorizedError} from "@hashcash/common";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {AccessToken} from "../models/accessToken";
interface Payload{
    serviceName :string,
    masterId:string
}

declare global{ // this let me modify the Request interface and add more prop to it
    namespace Express{
        interface Request{
            payload?: Payload;
        }
    }
}


export const protect =async (req:Request,res:Response,next:NextFunction) => {
    //get the access token from the header
    if (!req.headers.authorization){
        throw  new NotAuthorizedError();
    }

    const token = req.headers.authorization;

    try{
        //see if it is a valid jwt token
        const payload = jwt.verify(token,process.env.JWT_KEY_SERVICE_ACCESS!)as Payload;

        //hash the token to match the one in the database
        const hashedToken =crypto.createHash('sha256').update(token).digest('hex');

        // trying to find the token in the database
        const existingToken = await AccessToken.findOne({token:hashedToken});
        if (!existingToken){
            throw new Error('invalid access token');
        }

        //know we made suer that access in valid and that it is stored in the database
        //assign the payload to the req
        req.payload = payload;

        next();
    }catch (e) {
        throw new NotAuthorizedError(['invalid access token']);
    }









}
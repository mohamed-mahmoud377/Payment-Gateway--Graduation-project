import express, { Request, Response} from "express";
import {NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {jwtGenerator} from "../utils/jwtGenerator";
import {body, query} from "express-validator";
import {Token} from "../models/tokens";
import {Key} from "../models/key";
import crypto from "crypto";


const router = express.Router();

// creates a service access token which I am going to give for example tokenization service so that it has
// to send this token via every request to know which service is sending me this request and to know if
// this service is acutely authored or not
// of course only admins are allowed to generate this token
router.get('/service-access-token',[query('service_name')
        .notEmpty()
        .withMessage('service_name must be provided as query param')
    ],validateRequest,
    requireAuth,async (req:Request,res:Response)=>{
    const { service_name} = req.query;


    // making sure that there a master key
    const masterKey = await Key.findOne({type:'master'});
    if (!masterKey){
        throw new NotFoundError(['no master key found']);
    }
    // hash the master key Id to put it in the access token so when we come back we know there master key
        // but we are sending it hashed for security
    const hashedMasterId  = crypto.createHash('sha256').update(masterKey.id).digest('hex');

        // creating a service token valid for 100 day
        const {accessToken} = jwtGenerator({serviceName:service_name,masterId:hashedMasterId},'100d');

    const hashedToken = crypto.createHash('sha256').update(accessToken).digest('hex');

    const token =  new Token({
        token:hashedToken,
        from:service_name,
    })
   await  token.save();
    sendSuccess(res,201, {accessToken});



})

export {router as getServiceAccessToken}
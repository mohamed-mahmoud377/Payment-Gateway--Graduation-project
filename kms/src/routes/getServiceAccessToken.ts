import express, { Request, Response} from "express";
import {requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {jwtGenerator} from "../utils/jwtGenerator";
import {body, query} from "express-validator";


const router = express.Router();

// creates a service access token which I am going to give for example tokenization service so that it has
// to send this token via every request to know which service is sending me this request and to know if
// this service is acutely authored or not
// of course only admins are allowed to generate this token
router.get('/service-access-token',[query('service_name')
        .notEmpty()
        .withMessage('service name must be provided')
    ],validateRequest,
    requireAuth,(req:Request,res:Response)=>{
    const { service_name} = req.query;

    // creating a service token valid for 100 day
    const accessToken = jwtGenerator({service_name},'100d');


    sendSuccess(res,201,accessToken);



})

export {router as getServiceAccessToken}
import express, { Request, Response} from "express";
import {requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {jwtGenerator} from "../utils/jwtGenerator";

import {Token} from "../models/tokens";


const router = express.Router();


router.get('/tokens',
    requireAuth(),async (req:Request,res:Response)=>{

    const tokens =await  Token.find({});

    sendSuccess(res,200,tokens,tokens.length);

    })

export {router as getTokens}
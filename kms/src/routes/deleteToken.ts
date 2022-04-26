import express, { Request, Response} from "express";
import {NotFoundError, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {jwtGenerator} from "../utils/jwtGenerator";

import {Token} from "../models/tokens";
import mongoose from "mongoose";


const router = express.Router();


router.delete('/tokens/:id',
    requireAuth,async (req:Request,res:Response)=>{
        const {id} = req.params;
        if (!mongoose.isValidObjectId(id)){
            throw new NotFoundError(['token not found']);
        }
        const token =await  Token.findByIdAndDelete(id);
        if (!token){
            throw new NotFoundError(['token not found']);
        }

        sendSuccess(res,204);

    })

export {router as deleteToken}
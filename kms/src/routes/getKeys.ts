import express, {Request, Response} from "express";
import {BadRequestError, NotFoundError, requireAuth, sendSuccess} from "@hashcash/common";
import {generateKey} from "../utils/generateKey";
import {Key} from "../models/key";
import mongoose from "mongoose";



const router = express.Router();


router.get('/keys',requireAuth,
    async (req:Request,res:Response)=>{

        const key = await Key.find({});



        sendSuccess(res,200,{
            key
        },key.length)
    })

export {router as getKeysRoute};
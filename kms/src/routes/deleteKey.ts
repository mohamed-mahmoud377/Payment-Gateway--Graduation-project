import express, {Request, Response} from "express";
import {BadRequestError, NotFoundError, requireAuth, sendSuccess} from "@hashcash/common";
import {generateKey} from "../utils/generateKey";
import {Key} from "../models/key";
import mongoose from "mongoose";



const router = express.Router();


router.delete('/keys/:id',requireAuth,
    async (req:Request,res:Response)=>{
        const {id} = req.params;
        // checking first if the user id is valid before going to database
        if (!mongoose.isValidObjectId( id)){
            throw new  NotFoundError(['key not found']);
        }
        const key = await Key.findByIdAndDelete(id);
        if (!key){
            throw new NotFoundError(['key not found'])
        }


        sendSuccess(res,204)
    })

export {router as deleteKeyRoute};
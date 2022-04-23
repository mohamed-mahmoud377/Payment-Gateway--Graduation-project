import express, {Request, Response} from "express";
import {requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {generateKey} from "../utils/generateKey";
import {Key} from "../models/key";
import {body} from "express-validator";


const router = express.Router();


router.post('/generate-master',[
    body('keyBytes')
        .notEmpty()
        .withMessage('keyBytes must be provided')
        .bail()
        .isNumeric()
        .withMessage('KeyBytes must be a number'),
        body('IVBytes')
            .notEmpty()
            .withMessage('IVBytes must be provided')
            .bail()
            .isNumeric()
            .withMessage('IVBytes must be a number')
    ],validateRequest,requireAuth,
    async (req:Request,res:Response)=>{
    const key = generateKey(32,16);
    let  keyDb =  new Key({
        key
    })
     keyDb = await keyDb.save();

    sendSuccess(res,201,keyDb)
})

export {router as generateMasterRoute};
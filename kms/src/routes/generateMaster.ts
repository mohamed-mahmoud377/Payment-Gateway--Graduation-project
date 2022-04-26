import express, {Request, Response} from "express";
import {requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {generateKey} from "../utils/generateKey";
import {Key} from "../models/key";
import {body} from "express-validator";
import crypto from "crypto";


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

        const {keyBytes,IVBytes} = req.body;
    const key = generateKey(keyBytes,IVBytes);
    let  keyDb =  new Key({
        key
    })
     keyDb = await keyDb.save();

    // this first hash is going to be sent for the user because we will not send the real ID
    const hashedId  =crypto.createHash('sha256').update(keyDb.id).digest('hex');
    // but this is going to be saved in the database because this will our only way to know the user by hashing the hash
        // that they will give us
    const hashedSecondTime =  crypto.createHash('sha256').update(hashedId).digest('hex');
    keyDb.set({hashedId: hashedSecondTime});
    await keyDb.save();


    sendSuccess(res,201,keyDb)
})

export {router as generateMasterRoute};
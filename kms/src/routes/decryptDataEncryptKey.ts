import express, {Request, Response} from "express";
import {protect} from "../middlewares/protect";
import {generateKey} from "../utils/generateKey";
import crypto from "crypto";
import * as assert from "assert";
import {Key} from "../models/key";
import {BadRequestError, NotFoundError, sendSuccess} from "@hashcash/common";
import {encrypt} from "../utils/encrypt";
import {body} from "express-validator";
import {decrypt} from "../utils/decrypt";


const router = express.Router();


router.post('/decrypt-key',protect,[
    body("encryptedKey")
        .notEmpty()
        .withMessage('encrypted data encryption key must be provided to decrypt')
],(async (req:Request, res:Response) =>{
    try{
        const {encryptedKey} = req.body;

        //get the master key for this token
        const hashedMasterId =  crypto.createHash('sha256').update(req.payload?.masterId!).digest('hex');

        const masterKey = await Key.findOne({hashedId:hashedMasterId});
        if (!masterKey){
            throw new NotFoundError(['There not masterKey associated with you token'])
        }

        //encrypt the dataEncryption key with the master-key
        const decryptedDataEncryptKey = decrypt(encryptedKey,masterKey.key);

        masterKey.decryptNumber = masterKey.decryptNumber +1;
        await  masterKey.save();

        // send them both plaint text and encrypted dataEncryption key\

        sendSuccess(res,201,{dataEncryptKey:decryptedDataEncryptKey});

    }catch (e) {
        throw  new BadRequestError(['unable to decrypt your key'])
    }

} ))

export {
    router as decryptDataEncryptKey
}
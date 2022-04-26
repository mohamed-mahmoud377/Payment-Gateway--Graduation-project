import express, {Request, Response} from "express";
import {protect} from "../middlewares/protect";
import {generateKey} from "../utils/generateKey";
import crypto from "crypto";
import * as assert from "assert";
import {Key} from "../models/key";
import {NotFoundError, sendSuccess} from "@hashcash/common";
import {encrypt} from "../utils/encrypt";


const router = express.Router();


router.get('/data-encrypt-key',protect,(async (req:Request, res:Response) =>{

    //get the master key for this token
    const hashedMasterId =  crypto.createHash('sha256').update(req.payload?.masterId!).digest('hex');

    const masterKey = await Key.findOne({hashedId:hashedMasterId});
    if (!masterKey){
        throw new NotFoundError(['There not masterKey associated with you token'])
    }

    //generate a data-encryption-key for this user
    const dataEncryptKey = generateKey(32,16);

    //encrypt the dataEncryption key with the master-key
    const decryptedDataEncryptKey = encrypt(dataEncryptKey,masterKey.key);

    // send them both plaint text and encrypted dataEncryption key\

    sendSuccess(res,201,{dataEncryptKey,decryptedDataEncryptKey});

} ))

export {
    router as dataEncryptKey
}
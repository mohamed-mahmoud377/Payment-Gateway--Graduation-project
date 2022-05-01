import express, {Request, Response} from "express";
import {decrypt, NotFoundError, sendSuccess, validateRequest} from "@hashcash/common";
import {protect} from "../middlewares/protect";
import {body} from "express-validator";
import {Token} from "../models/token";
import axios from "axios";

const router = express.Router();


router.post('/de-tokenize',protect,[
    body('token')
        .notEmpty()
        .withMessage('token field must be provided')
],validateRequest,(async (req:Request, res:Response) =>{
    // getting the token and renaming it to tokenValue
  const { token: tokenValue}  = req.body;

  // finding the token
  const token = await Token.findOne({tokenValue});

  if (!token){
      throw new NotFoundError(['data associated with this token is not found'])
  }
  // now we have the key but encrypted and the data also encrypted
  const {dataEncrypted,keyEncrypted} = token;

  // will reach out to kms to decrypt the key
    const response = await axios.post('http://kms-srv:3000/api/kms/decrypt-key',{
        encryptedKey:keyEncrypted

    },{
        timeout: 3000,
        headers:{
            'Authorization':process.env.SERVICE_ACCESS_TOKEN!
        }
    });

    // decrypted key
const key = response.data.data.dataEncryptKey;

// let's decrypt the data with the key to get the real data which will be json of course
const  dataJSON = decrypt(dataEncrypted,key);

// getting the data object
const data = JSON.parse(dataJSON);

sendSuccess(res,200,data)


} ))


export {
    router as deTokenizeRoute
}
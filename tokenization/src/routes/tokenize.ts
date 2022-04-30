import express, {Request, Response} from "express";
import {protect} from "../middlewares/protect";
import {BadRequestError, encrypt, sendSuccess, validateRequest} from "@hashcash/common";
import {body} from "express-validator";
import crypto from "crypto";
import {Token} from "../models/token";
import axios from "axios";
import mongoose from "mongoose";
import {generateToken} from "../utils/generateToken";

//to do
// making sure that the route is protected with the protect middleware
// making sure that the body contains data named data to tokenize
//  hash the data first
// search with this hash to know if this data is already there or not in the database
// if there just get the already existing token and send it back
// why are we doing what is above because first the data is encrypted and there no way to if this is the same data exists or not we do not want duplicated pan number it is possible but we are not going with this
// and second the token is different every time so we can not know if the data exists from the token or not
// so we hash the data and save the hash with the encrypted data so when we get the same data again we compare the hash
// to know if it is already exists or not
// note that you have to hash the merchant ID with card hold data because the cardDat with if different merchant is considered different
// so if we did not find the hash in the database
// go to kms service and request a key to encrypt the data with
// we get the key and its encryption with the master key
//  now we encrypt the data the plaint text key and then throw it away
// we generate the token from our pan number
// last four digits from the pan will be the same for the token
// then the last of the pan will be randomly generated like pan 1234 1234 1234 1234 token will be 987614123234 1234 only t he last four digits will be the same
// then we put the token and the encrypted data and and encrypted key in the database
// we will use the encrypted key to decrypt the data later

const router = express.Router();

router.post('/tokenize',protect,[
    body('cardHolderData')
        .notEmpty()
        .withMessage('cardHolderData field can not be empty'),
    body('merchantId')
        .notEmpty()
        .withMessage('merchantId field can not be empty')

],validateRequest,async (req:Request,res:Response)=>{

    const {cardHolderData,merchantId} = req.body;

    // making sure that I'm tokenizing the pan and mon and year and cardHolderName and merchant id
    let errorMessages :string[] = [];
    if (cardHolderData.pan===undefined)
        errorMessages.push('PAN number must be provided as pan');
    if (String(cardHolderData.pan).length!==16)
        errorMessages.push('Pan number must have all 16 digits')
    if (cardHolderData.month===undefined)
        errorMessages.push('Month number must be provided as month');
   if (cardHolderData.year===undefined)
       errorMessages.push('Year number must be provided as year');
    if (cardHolderData.name===undefined)
        errorMessages.push('Name must be provided as name');
    if (!mongoose.isValidObjectId(merchantId))
        errorMessages.push('Merchant ID must valid');
    if (errorMessages.length>0)
        throw new BadRequestError(errorMessages);

    const panNumber= String(cardHolderData.pan);
    const lastFourDigits = panNumber.slice(-4);

    const data = {
        cardHolderData,
        merchantId
    }

    // hash the data which is an object that contains the pan and cardHolderName and year and month and merchant id
    const hashedData = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');

    // lets se if the hashed value is in the database or not
    const  existingToken= await Token.findOne({dataHash:hashedData});
    // if so, so we will just send the tokenValue as the token and that's it
    if (existingToken){
        return sendSuccess(res,201,{
            token:existingToken.tokenValue
        })
    }
    // now that we know that this pan number is new lets as kms service for a key to encrypt the data with
    // console.log(`${process.env.SERVICE_ACCESS_TOKEN}`)
    const response = await axios.get('http://kms-srv:3000/api/kms/data-encrypt-key',{
        timeout: 3000,
        headers:{
            'Authorization':process.env.SERVICE_ACCESS_TOKEN!
        }
    });

    let  dataEncryptKey = response.data.data.dataEncryptKey;
    const encryptedDataEncryptKey = response.data.data.encryptedDataEncryptKey;

    //encrypt the data with the plaint txt data encryption key
    const encryptedData  = encrypt(JSON.stringify(data),dataEncryptKey);
    // making sure that after encryption the plaint text id undefined
    dataEncryptKey = undefined;

    // lets generate the token
    const tokenNumber  = generateToken(lastFourDigits);

    // save the token and the encrypted key and the encrypted data
    const token  =  Token.build(
        {
            tokenValue: tokenNumber,
            from: req.payload?.serviceName!,
            dataHash: hashedData,
            dataEncrypted: encryptedData,
            keyEncrypted: encryptedDataEncryptKey
        });

    await token.save();

sendSuccess(res,200,{token:token.tokenValue});
})

export {
    router as tokenizeRouter
}


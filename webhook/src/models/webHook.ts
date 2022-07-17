import mongoose from "mongoose";
import * as Crypto from "crypto";

interface WebHookDoc extends mongoose.Document{
    url:string;
    status:string;
    description:string;
    merchantId:string;
    event:string;
    secretKey:string;
    createdAt:Date;
    updatedAt:Date;

}

const webHookScheme = new mongoose.Schema({
    url:{
        type:String,
    },
    status:{
        type:String,
        default:'Active',
    },
    merchantId:{
        type:String,
    },
    description:{
        type:String,
        default:'No description'
    },
    event:{
        type:String,
        default:"Checkout.Completed"
    },
    secretKey:{
        type:String,
        default: Crypto.randomBytes(16).toString('hex')
    }
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}});

const WebHook = mongoose.model<WebHookDoc>("Webhook",webHookScheme);

export {
    WebHookDoc,
    WebHook
}
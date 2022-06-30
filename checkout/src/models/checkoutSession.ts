import mongoose from "mongoose";
import {CustomerAttrs, CustomerDoc, customerScheme} from "./customer";
import {ItemAttrs, itemScheme} from "./item";


interface CheckoutSessionDoc extends  mongoose.Document{
    status:string;
    MerchantId:string;
    expiresAt:Date;
    amountTotal:Number;
    liveMode:boolean;
    clientReferenceId?:string;
    currency:string;
    checkoutCode:string;
    checkoutUrl?:string;
    successUrl:string;
    cancelUrl:string;
    customer:CustomerAttrs,
    items:[ItemAttrs],
    relatedCustomerPaymentCards:[string]
}

const checkoutSessionScheme = new mongoose.Schema({
    status:{
        type:String,
        required:true
    },
    merchantId:{
        type:String,
    },
    expiresAt:{
        type:Date,
    },
    amountTotal:{
        type:Number
    },
    liveMode:{
        type:Boolean
    },
    clientReferenceId:{
        type:String
    },
    currency:{
        type:String
    },
    checkoutCode:{
        type:String,
    },
    checkoutUrl:{
        type:String
    },
    successUrl:{
        type:String
    },
    cancelUrl:{
        type:String
    },
    customer:customerScheme,
    items:[itemScheme],
    relatedCustomerPaymentCards:[{
        type:String
    }]
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})


const CheckoutSession = mongoose.model<CheckoutSessionDoc>('CheckoutSession',checkoutSessionScheme);


export{
    CheckoutSessionDoc,
    CheckoutSession,

}
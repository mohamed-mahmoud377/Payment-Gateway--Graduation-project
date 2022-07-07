import {ItemAttrs, itemScheme} from "./Item";
import mongoose from "mongoose";

interface PaymentDoc{

    status:string;
    cardToken:string;
    Items:[ItemAttrs];
    totalAmount:number;
    merchantId:string;
    paymentDescription:string;
    cardType:string;
    clientReferenceId:string;
    clientEmail:string;
    isLive:boolean;
    createdAt:Date;
    updatedAt:Date;
}

const paymentScheme = new mongoose.Schema({
    status:{
        type:String,
    },
    cardToken:{
        type:String,
        default:"None"
    },
    Items:[itemScheme],
    merchantId: {
        type:String
    },
    paymentDescription:{
        type:String,
        default:"No description"
    },
    totalAmount:{
      type:Number ,
    },
    cardType:{
        type:String,
        enum:["Visa credit card","Mastercard credit card","None"],
        default:"None"
    },
    clientReferenceId:{
        type:String,
    },
    clientEmail:{
        type:String
    },
    isLive:{
        type:Boolean
    }


},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

const Payment = mongoose.model<PaymentDoc>("Payment",paymentScheme);

export {
    paymentScheme,
    Payment
}
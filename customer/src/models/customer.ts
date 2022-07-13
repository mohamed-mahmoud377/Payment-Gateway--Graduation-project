import mongoose from "mongoose";
import {PaymentAttr, paymentScheme} from "./payment";

interface CustomerDoc extends mongoose.Document{
    email:string;
    name?:string;
    phoneNumber?:string;
    address?:string;
    clientReferenceId:string;
    merchantId:string;
    payments:[PaymentAttr];
    createdAt:Date;
    updatedAt:Date;
    LiveCustomer:boolean;


}

const customerScheme = new mongoose.Schema({
    email:{
        type:String,
    },
    name:{
        type:String,
        default:"N/A",
    },
    phoneNumber:{
        type:String,
        default:"N/A"
    },
    address:{
        type:String,
        default:"N/A",
    },
    clientReferenceId:{
        type:String,
    },
    merchantId:{
        type:String
    },
    payments:[paymentScheme],
    liveCustomer:Boolean


},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

const Customer = mongoose.model<CustomerDoc>('Customer',customerScheme);

export {
    CustomerDoc,
    Customer,
    customerScheme
}
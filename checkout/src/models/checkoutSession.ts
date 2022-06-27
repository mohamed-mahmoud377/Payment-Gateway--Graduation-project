import mongoose from "mongoose";


interface CheckoutSessionDoc extends  mongoose.Document{
    status:string;
    expiresAt:Date;
    amountTotal:Number;
    liveMode:boolean;
    clientReferenceId?:string;
    currency:string;
    checkoutCode:string;
    url?:string;





}
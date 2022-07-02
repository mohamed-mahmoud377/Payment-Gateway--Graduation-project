import mongoose from "mongoose";
import {CustomerAttrs, CustomerDoc, customerScheme} from "./customer";
import {ItemAttrs, itemScheme} from "./item";
import * as crypto from "crypto";


interface CheckoutSessionDoc extends  mongoose.Document{
    status:string;
    paidFor:boolean;
    merchantId:string;
    expiresAt:Date;
    amountTotal:Number;
    liveMode:boolean;
    clientReferenceId:string;
    currency:string;
    checkoutUrl?:string;
    successUrl:string;
    cancelUrl:string;
    hash:string;
    customer:CustomerAttrs,
    items:[ItemAttrs],
    relatedCustomerPaymentCards:[string];
    calculateTotalAmount():number;
    showForUser():CheckoutSessionDoc;
    createdAt:Date;
    updatedAt:Date;
}

interface CheckoutSessionModel extends mongoose.Model<CheckoutSessionDoc>{

}



const checkoutSessionScheme = new mongoose.Schema({
    status:{
        type:String,
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
    hash:{
      type:String
    },
    currency:{
        type:String
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
    paidFor:{
      type:Boolean,
        default:false
    },
    customer:customerScheme,
    items:[itemScheme],
    relatedCustomerPaymentCards:[{
        type:String
    }]
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

checkoutSessionScheme.methods.calculateTotalAmount= function (){
    this.amountTotal= 0;
    this.items.forEach((val: { amount: number; quantity: number; } )=>{
        this.amountTotal+=val.amount * val.quantity
    })

}

checkoutSessionScheme.methods.showForUser= function () {
    this.status= undefined;
    this.hash= undefined;
    this.createdAt= undefined;
    this.updatedAt =undefined;
    this.__v=undefined;
    this.items.forEach((val: { createdAt: undefined; updatedAt: undefined; }) => {
        val.createdAt=undefined;
        val.updatedAt=undefined;
    });
    this.customer.createdAt=undefined;
    this.customer.updatedAt=undefined;
    return this
}

checkoutSessionScheme.pre<CheckoutSessionDoc>('save',function (next) {
    if (this.hash!==undefined) next();
    this.hash = crypto.createHash('sha256').update(this.id).digest('hex');
    next();

})


const CheckoutSession = mongoose.model<CheckoutSessionDoc,CheckoutSessionModel>('CheckoutSession',checkoutSessionScheme);


export{
    CheckoutSessionDoc,
    CheckoutSession,

}
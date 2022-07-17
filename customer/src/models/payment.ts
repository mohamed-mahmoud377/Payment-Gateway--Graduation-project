import mongoose from "mongoose";
interface PaymentAttr {
    id?:string;
    totalAmount:number;
    currency:string;
    paymentDate:Date;
    description:string;
    status:string;
}

interface PaymentDoc extends mongoose.Document{
    id:string;
    totalAmount:number;
    currency:string;
    paymentDate:Date;
    description:string;
    status:string;
    createdAt:Date;
    updatedAt:Date;
}

const paymentScheme = new mongoose.Schema({
    totalAmount:Number,
    status:String,
    currency:String,
    paymentDate:Date,
    description:String
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

const Payment = mongoose.model<PaymentDoc>('Payment',paymentScheme);

export {
    PaymentDoc,
    PaymentAttr,
    Payment,
    paymentScheme
}
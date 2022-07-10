import mongoose from "mongoose";
interface PaymentAttr {
    totalAmount:number;
    currency:string;
    paymentDate:Date;
    description:string;
}

interface PaymentDoc extends mongoose.Document{
    totalAmount:number;
    currency:string;
    paymentDate:Date;
    description:string;
    createdAt:Date;
    updatedAt:Date;
}

const paymentScheme = new mongoose.Schema({
    totalAmount:Number,
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
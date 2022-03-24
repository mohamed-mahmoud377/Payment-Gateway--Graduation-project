import * as mongoose from "mongoose";


interface MerchantAttrs {
    email:string;
    name:string;
    password:string;

}


interface MerchantDoc extends mongoose.Document{
    email:string;
    name:string;
    password:string;
    isEmailVerified :boolean;
    isActive:true;
    createdAt:Date;
    updatedAt:Date;
    otpNumber:Number;
    otpExpiryDate:Date;

}

interface MerchantModel extends mongoose.Model<MerchantDoc>{
     build(attrs:MerchantAttrs):MerchantDoc;
}


const merchantScheme = new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    },
    otpNumber:Number,
    otpExpiryDate:Date,

},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

merchantScheme.statics.build=(attrs:MerchantAttrs)=>{
    return new Merchant(attrs);
}
const Merchant = mongoose.model<MerchantDoc,MerchantModel>('Merchant',merchantScheme);

export {Merchant,MerchantDoc}
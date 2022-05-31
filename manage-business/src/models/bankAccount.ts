import mongoose from "mongoose";

interface bankAccountAttrs {
  IBAN:string;
  isVerified?:boolean;

}

interface BankAccountDoc extends mongoose.Document{
    IBAN:string;
    isVerified:boolean;
    createdAt:Date;
    updatedAt:Date;

}

interface BankAccountModel extends mongoose.Model<BankAccountDoc>{
    build(attrs:bankAccountAttrs):BankAccountDoc;
}


const BankAccountScheme = new mongoose.Schema({
    IBAN:{
        type:String,
        required:true
    },
    isVerified:{
      type:Boolean,
      required:false,
        // this should not be true I know but we are noe implementing any logic to verify it  an any way
      default:true
    }
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

BankAccountScheme.statics.build=(attrs:bankAccountAttrs)=>{
    return new BankAccount(attrs);
}
const BankAccount = mongoose.model<BankAccountDoc,BankAccountModel>('BankAccount',BankAccountScheme);

export {BankAccount,BankAccountDoc,BankAccountScheme,bankAccountAttrs}
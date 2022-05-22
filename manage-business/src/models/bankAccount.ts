import mongoose from "mongoose";

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
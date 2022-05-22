import mongoose from "mongoose";

const businessScheme = new mongoose.Schema({
    address:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:['company','individual']
    },
    legalName:{
        type:String,
        required:true,
    },
    registrationNumber:{
        type:String,
        required:true
    },
    industry:{
      type:String,
      required:true,
        // not the best way to do this but it is okay for now
      enum:['software','clothing',"digital products","food and drink","education","travel","entertainment","medical services"]
    },
    website:{
        type:String,
        required:true
    },
    productDescription:{
      type:String,
      required:true
    },
    VATNumber:{
        type:String,
        required:false,
        default:'none'
    },

},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})
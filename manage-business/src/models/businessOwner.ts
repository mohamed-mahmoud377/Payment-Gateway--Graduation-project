import mongoose from "mongoose";

const businessOwnerScheme = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    nationalId:{
        type:String,
        required:true,
    }

},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})
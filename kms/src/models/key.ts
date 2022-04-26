import mongoose from "mongoose";

interface KeyDoc extends mongoose.Document {
    key:string,
    type:string,
    expiresAt:string,
    encryptNumber:number,
    decryptNumber:number,
    createdAt:Date,
    updatedAt:Date,
    hashedId:string

}

const keyScheme = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true,
    },
    type:{
        type:String,
        default:'master'
    },
    expiresAt:{
        type:Date,
        default:new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    },
    encryptNumber: {
        type:Number,
        default:0
    },
    decryptNumber: {
        type:Number,
        default:0
    },
    hashedId:{
        type:String,
        default:'none'

    }
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}});

const Key = mongoose.model<KeyDoc>('Key',keyScheme);

export {Key}
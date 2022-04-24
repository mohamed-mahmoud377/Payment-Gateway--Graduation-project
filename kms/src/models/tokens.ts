import mongoose from "mongoose";

interface tokensDoc extends mongoose.Document {
    token:string,
    type:string,
    from:string,
    createdAt:Date,
    updatedAt:Date

}

const tokensScheme = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    from:{
        type:String,
        default:'unknown'

    },
    type:{
        type:String,
        default:'access'
    },
    expiresAt:{
        type:Date,
        default:new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    },

},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}});

const Token = mongoose.model<tokensDoc>('Key',tokensScheme);

export {Token}
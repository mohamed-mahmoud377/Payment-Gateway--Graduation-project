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


},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}});

const AccessToken = mongoose.model<tokensDoc>('AccessToken',tokensScheme);

export {AccessToken}
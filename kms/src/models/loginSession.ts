import mongoose from "mongoose";
import * as crypto from "crypto";

interface LoginSessionDoc extends mongoose.Document{

    device:string;
    os:string;
    ip:string;

    createdAt:Date;
    browser:string


}
interface LoginSessionAttrs {
    _id?:mongoose.Types.ObjectId;
    device?:string;
    browser?:string
    ip:string;

    createdAt?:Date;

}


const loginSessionSchema = new mongoose.Schema({

    device:{
        type:String,
        default:'unknown'
    },
    browser:{
        type:String,
        default:'unknown'
    },
    ip:{
        required:true,
        type:String,
    },


},{timestamps:{createdAt:'createdAt',updatedAt:false}})


const LoginSession = mongoose.model<LoginSessionDoc>('LoginSession',loginSessionSchema);

export {LoginSessionDoc ,LoginSession,loginSessionSchema,LoginSessionAttrs}
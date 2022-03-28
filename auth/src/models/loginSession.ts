import mongoose from "mongoose";
import * as crypto from "crypto";

interface LoginSessionDoc extends mongoose.Document{
    token:string;
    device:string;
    os:string;
    ip:string;
    expired:boolean;
    createdAt:Date;
    browser:string


}
interface LoginSessionAttrs {
    token:string;
    device?:string;
    browser?:string
    ip:string;
    expired?:boolean;
    createdAt?:Date;

}


const loginSessionSchema = new mongoose.Schema({
    token:{
        required:true,
        type:String,

        trim:true,
    },
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
    expired:{
        type:Boolean,
        default:false
    },

},{timestamps:{createdAt:'createdAt',updatedAt:false}})

loginSessionSchema.pre('save',function (){
    this.token= crypto.createHash('sha256').update(this.token).digest('hex');
})
const LoginSession = mongoose.model<LoginSessionDoc>('LoginSession',loginSessionSchema);

export {LoginSessionDoc ,LoginSession,loginSessionSchema,LoginSessionAttrs}
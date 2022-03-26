import * as mongoose from "mongoose";
import {PasswordManger} from "../utils/passwordManger";
import {LoginSession, LoginSessionAttrs, LoginSessionDoc, loginSessionSchema} from "./loginSession";

interface UserAttrs {
    email:string;
    name:string;
    password:string;


}


interface UserDoc extends mongoose.Document{
    email:string;
    name:string;
    password:string;
    isEmailVerified :boolean;
    isActive:true;
    createdAt:Date;
    updatedAt:Date;
    otpNumber?:Number;
    otpExpiryDate?:Date;
    role:string;
    loginSession:[LoginSessionAttrs];


}

interface UserModel extends mongoose.Model<UserDoc>{
     build(attrs:UserAttrs):UserDoc;
}


const UserScheme = new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true,
        trim:true,
    },
    password:{
        required:true,
        type:String,
        trim:true,

    },
    name:{
        required:true,
        type:String,
        trim:true
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:'merchant',
        enum:['admin','merchant','developer']
    },
    otpNumber:Number,
    otpExpiryDate:Date,
    loginSession:[loginSessionSchema]


},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})





UserScheme.pre("save", async function (next) {
    if (!this.isModified('password')) return next(); // this pre function will be called every time a new user have been created or even
    //updated so this really important to check if  the password was not modified just return and go the  next middleware
    const hashed = await PasswordManger.toHash(this.get('password'));// return a promise
    this.set('password',hashed);
    next();

});






UserScheme.statics.build=(attrs:UserAttrs)=>{
    return new User(attrs);
}
const User = mongoose.model<UserDoc,UserModel>('User',UserScheme);

export {User,UserDoc}
import mongoose from "mongoose";
import {LoginSessionAttrs, loginSessionSchema} from "./loginSession";
import {PasswordManger} from "@hashcash/common";

interface AdminDoc extends mongoose.Document {
    email:string;
    name:string;
    password:string;
    otpNumber?:number;
    otpExpiryDate?:Date;
    loginSession:[LoginSessionAttrs];
    lastLogin:Date;
    createdAt:Date;
    updatedAt:Date;


}

const AdminScheme = new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true,
        trim:true
    },
    password:{
        required:true,
        type:String,
        trim:true
    },
    name:{
        type:String,
        default:"admin"
    },
    otpNumber:Number,
    otpExpiryDate:Date,
    loginSession:[loginSessionSchema],
    lastLogin:{
        Date,
    },

},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

AdminScheme.pre("save", async function (next) {
    if (!this.isModified('password')) return next(); // this pre function will be called every time a new user have been created or even
    //updated so this really important to check if  the password was not modified just return and go the  next middleware
    const hashed = await PasswordManger.toHash(this.get('password'));// return a promise
    this.set('password',hashed);
    next();

});

const Admin = mongoose.model<AdminDoc>('admin',AdminScheme);


export {Admin}
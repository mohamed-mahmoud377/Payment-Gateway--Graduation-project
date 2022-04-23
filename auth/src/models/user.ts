import * as mongoose from "mongoose";
import {PasswordManger} from "../utils/passwordManger";
import {LoginSession, LoginSessionAttrs, LoginSessionDoc, loginSessionSchema} from "./loginSession";
import crypto from "crypto";

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
    isActive?:boolean;
    createdAt:Date;
    updatedAt:Date;
    otpNumber?:number;
    otpExpiryDate?:Date;
    twoWayAuth:boolean
    role:string;
    loginSession:[LoginSessionAttrs];
    lastLogin:Date;
    passwordRestToken?:string;
    passwordResetExpires?:Date;
    createAndAssignPasswordResetToken():string;
}

interface UserModel extends mongoose.Model<UserDoc>{
     build(attrs:UserAttrs):UserDoc;
     showProfile(id:string):UserDoc;
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
        default:'admin',
        enum:['admin','merchant','developer']
    },
    otpNumber:Number,
    otpExpiryDate:Date,
    loginSession:[loginSessionSchema],
    lastLogin:{
        Date,
    },
    passwordResetExpires:Date,
    passwordRestToken:String,
    twoWayAuth:{
        type:Boolean,
        default:false
    }



},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

UserScheme.methods.createAndAssignPasswordResetToken = function () {
    const restToken = crypto.randomBytes(32).toString("hex"); // generate rest token
    //hash it and save it to the database
    this.passwordRestToken = crypto.createHash('sha256').update(restToken).digest('hex');
    //set expiry time to 10 min
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return restToken; // sending the not hashed or encrypted one but the saving the encrypted to the database
}


UserScheme.statics.showProfile=async function (id:string){
     const user = await this.findById(id).select({
        email:1,
        name:1,
        loginSession:1,
        twoWayAuth:1,
        isEmailVerified:1,
        createdAt:1,
         _id:0,
         isActive:1,

    })

    return user;

}


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
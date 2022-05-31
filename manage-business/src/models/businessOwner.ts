import mongoose from "mongoose";
interface businessOwnerAttrs{
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    nationalId:string;

}


interface BusinessOwnerDoc extends mongoose.Document{
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    nationalId:string;
    createdAt:Date;
    updatedAt:Date;
}

interface UserModel extends mongoose.Model<BusinessOwnerDoc>{
    build(attrs:businessOwnerAttrs):BusinessOwnerDoc;
}

const BusinessOwnerScheme = new mongoose.Schema({
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

BusinessOwnerScheme.statics.build=(attrs:businessOwnerAttrs)=>{
    return new BusinessOwner(attrs);
}
const BusinessOwner = mongoose.model<BusinessOwnerDoc,UserModel>('BusinessOwner',BusinessOwnerScheme);

export {BusinessOwner,BusinessOwnerDoc,BusinessOwnerScheme,businessOwnerAttrs}
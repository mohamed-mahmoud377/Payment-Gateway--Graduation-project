import mongoose from "mongoose";

interface CustomerAttrs{
    email:string;
    name?:string;
    phoneNumber?:string;
    address?:string;
}

interface CustomerDoc extends mongoose.Document{
    email:string;
    name?:string;
    phoneNumber?:string;
    address?:string;

}

const customerScheme = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,

    },
    phoneNumber:{
        type:String
    },
    address:{
        type:String
    }
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

const Customer = mongoose.model<CustomerDoc>('Customer',customerScheme);

export {
    CustomerAttrs,
    CustomerDoc,
    customerScheme,
    Customer
}
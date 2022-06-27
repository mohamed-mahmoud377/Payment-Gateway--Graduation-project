import mongoose from "mongoose";

interface CustomerDoc extends mongoose.Document{
    email?:string;
    name?:string;
    phone?:string;
    address?:string;

}
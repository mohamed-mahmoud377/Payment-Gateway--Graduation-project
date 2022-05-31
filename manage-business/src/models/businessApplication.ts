import mongoose from "mongoose";
import {businessInfoAttrs, BusinessInfoDoc, BusinessInfoScheme} from "./businessInfo";
import {BusinessOwnerScheme} from "./businessOwner";
import {bankAccountAttrs, BankAccountScheme} from "./bankAccount";


interface BusinessApplicationAttrs {
    businessInfo:businessInfoAttrs;
    businessOwner:businessInfoAttrs;
    bankAccount:bankAccountAttrs;
}

interface BusinessApplicationDoc extends mongoose.Document{
    businessInfo:businessInfoAttrs;
    businessOwner:businessInfoAttrs;
    bankAccount:bankAccountAttrs;
    createdAt:Date;
    updatedAt:Date;
}

interface BusinessApplicationModel extends  mongoose.Model<BusinessApplicationDoc>{
    build(attrs:BusinessApplicationAttrs):BusinessApplicationDoc;
}

const businessApplicationScheme = new mongoose.Schema({

    businessInfo:BusinessInfoScheme,
    businessOwner:BusinessOwnerScheme,
    bankAccount:BankAccountScheme,
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})


businessApplicationScheme.statics.build= (attrs:BusinessApplicationAttrs)=>{
    return new BusinessApplication(attrs);
}

const BusinessApplication = mongoose.model<BusinessApplicationDoc,BusinessApplicationModel>("BusinessApplication",businessApplicationScheme);

export {BusinessApplication,BusinessApplicationDoc,BusinessApplicationAttrs,businessApplicationScheme}
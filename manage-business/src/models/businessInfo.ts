import mongoose from "mongoose";
interface businessInfoAttrs {
    address:string;
    type:string;
    legalName:string;
    registrationNumber:string;
    industry:string;
    website:string;
    productDescription:string;
    VATNumber?:string;


}

interface BusinessInfoDoc extends  mongoose.Document{
    address:string;
    type:string;
    legalName:string;
    registrationNumber:string;
    industry:string;
    website:string;
    productDescription:string;
    VATNumber?:string;
    createdAt:Date;
    updatedAt:Date;

}

interface BusinessInfoModel extends  mongoose.Model<BusinessInfoDoc>{
    build(attrs:businessInfoAttrs):BusinessInfoDoc;
}
const BusinessInfoScheme = new mongoose.Schema({
    address:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:['company','individual']
    },
    legalName:{
        type:String,
        required:true,
    },
    registrationNumber:{
        type:String,
        required:true
    },
    industry:{
      type:String,
      required:true,
        // not the best way to do this but it is okay for now
      enum:['software','clothing',"digital products","food and drink","education","travel","entertainment","medical services"]
    },
    website:{
        type:String,
        required:true
    },
    productDescription:{
      type:String,
      required:true
    },
    VATNumber:{
        type:String,
        required:false,
        default:'none'
    },

},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})


BusinessInfoScheme.statics.build=(attrs:businessInfoAttrs)=>{
    return new BusinessInfo(attrs);
}
const BusinessInfo = mongoose.model<BusinessInfoDoc,BusinessInfoModel>('Business',BusinessInfoScheme);

export {BusinessInfo,BusinessInfoDoc,BusinessInfoScheme,businessInfoAttrs}
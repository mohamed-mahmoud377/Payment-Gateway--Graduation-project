import {BusinessApplicationAttrs, businessApplicationScheme} from "./businessApplication";
import mongoose from "mongoose";

interface BusinessActivationRequestAttrs{
    BusinessApplication:BusinessApplicationAttrs;
    status:string;
    userId:string;
    DeclineReason?:string;
    reviewedBy?:string;
    reviewDate?:Date;
    userEmail:string;


}

interface BusinessActivationRequestDoc extends  mongoose.Document{
    BusinessApplication:BusinessApplicationAttrs;
    status:string;
    userId:string;
    DeclineReason?:string;
    reviewedBy?:string;
    reviewDate:Date;
    createdAt:Date;
    updatedAt:Date;
    userEmail:string;

}

interface BusinessActivationRequestModel extends mongoose.Model<BusinessActivationRequestDoc>{
    build(attrs:BusinessActivationRequestAttrs):BusinessActivationRequestDoc;
}

const businessActivationRequestScheme = new mongoose.Schema({

    BusinessApplication:businessApplicationScheme,
    status:{
        type:String,
        required:true,
        default:'pending',
        enum:["pending","approved","declined"]
    },
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    userEmail:{
        type:String,
        required:true,
        unique:true,
    },
    declineReason:{
        type:String,
    },
    reviewedBy:{
        type:String,
    },
    reviewDate:Date,

},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

businessActivationRequestScheme.statics.build=(attrs:BusinessActivationRequestAttrs)=>{
    return new BusinessActivationRequest(attrs);
}
const BusinessActivationRequest = mongoose.model<BusinessActivationRequestDoc,BusinessActivationRequestModel>("BusinessActivationRequest",businessActivationRequestScheme);

export {BusinessActivationRequest,BusinessActivationRequestAttrs,BusinessActivationRequestDoc};

import mongoose from "mongoose";

interface keysAttrs{
    testKey:string;
    liveKey?:string;
    testCreatedAt:Date;
    liveCreatedAt?:Date;
    mode:string;

}


interface KeyDoc extends  mongoose.Document{
    testKey:string;
    liveKey:string;
    testCreatedAt:Date;
    liveCreatedAt:Date;
    createdAt:Date;
    updatedAt:Date;
    mode:string;

}

interface KeyModel extends mongoose.Model<KeyDoc>{
    build(attrs:keysAttrs):KeyDoc;

}

const keysScheme = new mongoose.Schema({
    mode:{
        type:String,
        required:true,
        enum:["test","live"],
        default:"test"
    },
    userId:{
        type:String,
        required:true
    },
    verifiedMerchant:{
        type:Boolean,
        required:true
    },
    testKey:{
    type:String,
    required:true
    },
    liveKey:{
        type:String,
        required:false
    },testCreatedAt:{
        type:Date,
        required:true,
    },
    liveCreatedAt:{
        type:Date
    }



},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})



keysScheme.statics.build=(attrs:keysAttrs)=>{
    return new Keys(attrs);
};

const Keys = mongoose.model<KeyDoc,KeyModel>("Keys",keysScheme);

export {
    Keys , KeyDoc
}
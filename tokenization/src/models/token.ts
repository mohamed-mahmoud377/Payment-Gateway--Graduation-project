import mongoose from "mongoose";

// to use it in the build function to make easy for TS to know the types because of stupid mongoose
interface TokenAttrs{
  tokenValue:string;
  from:string;
  dataHash:string;
  dataEncrypted:string;
  keyEncrypted:string;
}

interface TokenDoc extends mongoose.Document{
    tokenValue:string;
    from:string;
    dataEncrypted:string;
    keyEncrypted:string;
    dataHash:string;
    createdAt:Date;
    updatedAt:Date;

}

interface TokenModel extends mongoose.Model<TokenDoc>{
    build(attrs:TokenAttrs):TokenDoc;
}

const TokenScheme = new mongoose.Schema({
    tokenValue:{
        required:true,
        unique:true,
        type:String
    },
    from:{
        required:true,
        type:String
    },
    dataEncrypted:{
        required:true,
        unique:true, // because when we encrypt we will never want the same encryption
        type:String,
    },
    keyEncrypted:{
        required:true,
        unique:true,   // each Card Hold Data has a unique key to decrypt it
        type:String,
    },
    dataHash:{
        type:String,
        required:true,
        unique:true, // we can't save the same hash
    }


},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

TokenScheme.statics.build=(attrs:TokenAttrs)=>{
    return new Token(attrs);
}
const Token = mongoose.model<TokenDoc,TokenModel>('Token',TokenScheme);

export {Token,TokenDoc}
import mongoose from "mongoose";

interface ItemAttrs{
    name:string;
    amount:number;
    description?:string;
    image?:string;
    quantity:number;

}

interface ItemDoc extends mongoose.Document{
    name:string;
    amount:number;
    image?:string;
    description?:string;
    quantity:number;
    createdAt:Date;
    updatedAt:Date;

}

const itemScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
    },
    description:{
        type:String
    },
    image:{
        type:String,
    },
    quantity:{
        type:Number,
        default:1
    }
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})


const Item = mongoose.model<ItemDoc>('Item',itemScheme);

export {
    ItemAttrs,
    ItemDoc,
    Item,
    itemScheme

}
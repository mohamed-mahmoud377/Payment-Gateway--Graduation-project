import mongoose from "mongoose";

interface ItemAttrs{
    name:string;
    amount:number;
    description?:string;
    quantity:number;

}

interface ItemDoc extends mongoose.Document{
    name:string;
    amount:number;
    description?:string;
    quantity:number;

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
    quantity:{
        type:Number
    }
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})


const Item = mongoose.model<ItemDoc>('Item',itemScheme);

export {
    ItemAttrs,
    ItemDoc,
    Item,
    itemScheme

}
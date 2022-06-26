import mogoose from "mongoose";
import {NextFunction, Request, Response} from "express";
import {NotFoundError} from "../errors/notFoundError";
import {sendSuccess} from "./sendSuccess";
import {APIFilter} from "./APIFilter";
import mongoose from "mongoose";

export class HandlerFactory<T> {
    public    deleteOne =( Model:mongoose.Model<T>)=> async (req:Request,res:Response,next:NextFunction)=>{
    if (!mongoose.isValidObjectId( req.params.id)){
        throw new NotFoundError([`${Model.modelName} was not found`])
    }
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc){
    throw new NotFoundError([`${Model.modelName} was not found`])
}

    sendSuccess(res,204);
}


    public  updateOne = (Model:mongoose.Model<T>)=> async (req:Request,res:Response,next:NextFunction)=>{

        if (!mongoose.isValidObjectId( req.params.id)){
            throw new NotFoundError([`${Model.modelName} was not found`])
        }
        const doc = await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if (!doc){
            throw new NotFoundError([`${Model.modelName} was not found`])
        }

        sendSuccess(res,200,{updatedDoc:doc});
    }

    public  createOne = (Model:mongoose.Model<T>)=> async (req:Request,res:Response,next:NextFunction)=>{

        const doc = await Model.create(req.body);


        sendSuccess(res,201,{newDoc :doc});
    }

    public  getOne = (Model:mongoose.Model<T>,popOptions?:mongoose.PopulateOptions)=>async (req:Request,res:Response,next:NextFunction)=>{

        if (!mongoose.isValidObjectId( req.params.id)){
            throw new NotFoundError([`${Model.modelName} was not found`])
        }

        let query = Model.findById(req.params.id);
        if (popOptions) query.populate(popOptions)
        const doc = await query;


        if (!doc){
            throw new NotFoundError([`${Model.modelName} was not found`]);
        }

        sendSuccess(res,200,{doc})
    }
    public  getAll = (Model:mongoose.Model<T>)=>async (req:Request,res:Response,next:NextFunction)=>{

        const features = new APIFilter(Model.find(),req.query).filter().sort().limitFields().paginate();

        const docsNumber= await Model.countDocuments();

        const docs = await features.query;

        sendSuccess(res,200,{docsNumber,docs},docs.length)
    }


}

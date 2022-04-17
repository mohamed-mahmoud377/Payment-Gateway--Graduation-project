import {Response} from "express";
export const sendSuccess= (res:Response,statusCode:number=200,data:Object={})=>{
    res.status(statusCode).send({
        status:"success",
        data: data
    })
}

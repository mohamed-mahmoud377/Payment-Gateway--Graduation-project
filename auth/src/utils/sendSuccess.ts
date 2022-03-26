import {Response} from "express";
export const sendSuccess= (res:Response,statusCode:number,data:Object)=>{
    res.status(statusCode).send({
        status:"success",
        data: data
    })
}

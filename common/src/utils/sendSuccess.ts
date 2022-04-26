import {Response} from "express";
export const sendSuccess= (res:Response,statusCode:number=200,data:Object={},results:number = 1)=>{
    res.status(statusCode).send({
        status:"success",
        results,
        data: data
    })
}

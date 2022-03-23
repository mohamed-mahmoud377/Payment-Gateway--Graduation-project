import {Response ,Request ,NextFunction} from "express";
import {CustomError} from "../errors/customError";

const sendErrorDev= (err:Error,req:Request,res:Response)=>{
    if (err instanceof CustomError){ // note that we use express validator to handle validation errors so inside this class a
        // errors prop which we got from express thin we try to format it in or standard way of handling errors
        return res.status(err.statusCode).send({
            status:"fail",
            errorCode:err.errorCode,
            errors: err.errorMessages,
            stack:err.stack,
        })
    }
    return res.status(500).send({
        status:'fail',
        message:err.message,
        stack:err.stack
    })


}

const sendErrorProd = (err:Error,req:Request,res:Response)=>{
    if (err instanceof CustomError){ // note that we use express validator to handle validation errors so inside this class a
        // errors prop which we got from express thin we try to format it in or standard way of handling errors
        return res.status(err.statusCode).send({
            status:"fail",
            errorCode:err.errorCode,
            errors: err.errorMessages,
        })
    }
    return res.status(500).send({
        status:'fail',
        code:500,
        errors:['Something went wrong']
    })
}
export const errorHandler = (err: Error ,req: Request, res:Response ,next:NextFunction)=>{
    console.log(err.message)
    console.log(err.stack)
   if (process.env.NODE_ENV==='production'){
       sendErrorProd(err,req,res);
   }else{
       sendErrorDev(err,req,res);
   }


}
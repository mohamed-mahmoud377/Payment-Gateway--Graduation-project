import express, {Request, Response} from "express";
import {protect} from "../middlewares/protect";
import {sendSuccess} from "@hashcash/common";



//to do
// making sure that the body contains data named data to tokenize





const router = express.Router();

router.post('/tokenize',protect,(req:Request,res:Response)=>{



sendSuccess(res,200);
})

export {
    router as tokenizeRouter
}


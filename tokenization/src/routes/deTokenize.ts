import express, {Request, Response} from "express";
import {sendSuccess} from "@hashcash/common";

const router = express.Router();


router.post('/de-tokenize',((req:Request, res:Response) =>{


sendSuccess(res)
} ))


export {
    router as deTokenizeRoute
}
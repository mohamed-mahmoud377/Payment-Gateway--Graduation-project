import express, {Request, Response} from 'express';
import {requireAuth, sendSuccess} from "@hashcash/common";




const router = express.Router();


router.get('/current-user',requireAuth,(req:Request ,res:Response)=>{
    sendSuccess(res,200,{currentUser:req.currentUser})


})

export { router as currentUserRoute}
import express, {Request, Response} from "express";
import {BadRequestError, Modes, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {Keys} from "../models/keys";
import {query} from "express-validator";

const router = express.Router();

router.get('/key',[
    query("mode")
        .notEmpty()
        .withMessage("mode query param is required ")
],validateRequest,requireAuth,async (req:Request,res:Response)=>{
    const {mode} = req.query;

    if (mode!==Modes.TEST && mode!==Modes.LIVE)
        throw new BadRequestError(["mode can only be live or test"]);

    const keys =await Keys.findOne({
        userId:req.currentUser?.id
    })

    if (!keys){
        throw new BadRequestError(["something went wrong"])
    }

   if (mode===Modes.LIVE) {
       if (!keys.verifiedMerchant) {
           throw new BadRequestError(["only verified merchants get live mode key"])
       }

       sendSuccess(res,200, {key:keys.liveKey})
   }else{
       sendSuccess(res,200,{key:keys.testKey})
   }


})

export {
    router as getKeyRoute
}
import express from "express";
import {BadRequestError, requireAuth, sendSuccess} from "@hashcash/common";
import {Keys} from "../models/keys";

const router = express.Router();

router.get('/mode',requireAuth,async (req,res)=>{

    const keys =await Keys.findOne({
        userId:req.currentUser?.id
    })

    if (!keys){
        throw new BadRequestError(["something went wrong"])
    }
    res.cookie("mode",keys.mode);
    sendSuccess(res,200, {mode:keys.mode})

})

export {
    router as getModeRoute
}
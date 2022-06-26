import express, {Request, Response} from "express";
import {BadRequestError, Modes, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {Keys} from "../models/keys";
import {body} from "express-validator";

const router = express.Router();

router.post('/mode',[
    body('mode')
        .notEmpty()
        .withMessage("mode field must be provided")
],validateRequest,requireAuth(), async (req:Request,res:Response)=>{
    const {mode} = req.body;
    if (mode!==Modes.TEST&& mode!==Modes.LIVE)
        throw new BadRequestError(["mode can only be test or live only"]);

    const keys =await Keys.findOne({
        userId:req.currentUser?.id
    })

    if (!keys){
        throw new BadRequestError(["something went fucking wrong"])
    }
    if(!keys.verifiedMerchant){
        throw  new BadRequestError(["only verified merchants can changes modes"])
    }
    keys.mode = mode;
    await keys.save();
    res.cookie('mode',mode);
    sendSuccess(res,200, {mode:keys.mode})

})

export {
    router as changeModeRoute
}
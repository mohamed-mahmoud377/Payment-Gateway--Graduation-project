import express, {Request, Response} from "express";
import {BadRequestError, NotFoundError, requireAuth, sendSuccess} from "@hashcash/common";
import {User} from "../models/user";

const router = express.Router();


router.patch('/enable-factor-auth',requireAuth(),async (req:Request,res:Response)=>{
    const user  = await User.findById(req.currentUser?.id);

    if (!user){
        throw new NotFoundError(['user not found']);
    }
    if (!user.isEmailVerified){
        throw  new BadRequestError(['only verified accounts can enable two factor auth'])
    }
    user.twoWayAuth = true;
    await user.save();

    sendSuccess(res);

})

export {router as enableTwoFactorAuthRoute}
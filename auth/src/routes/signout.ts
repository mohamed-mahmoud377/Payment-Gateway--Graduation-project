import express, {Request, Response} from "express";
import {requireAuth} from  "@hashcash/common";
import {User} from "../models/user";
import {NotFoundError} from  "@hashcash/common";
import {sendSuccess} from "@hashcash/common";

const router = express.Router();


router.post('/signout',requireAuth(),async (req:Request,res:Response)=>{
    const user = await User.findById(req.currentUser?.id);
    if (!user){
        throw new NotFoundError();
    }
    user.loginSession.forEach(val =>{
        if (val._id!.toHexString()===req.currentUser?.sessionId){
            val.expired = true;
        }
    })

    await user.save();
    res.cookie('jwt',undefined);

    sendSuccess(res);

})

export {
    router as signoutRoute
}
import express, {Request, Response} from "express";
import {requireAuth} from "../middlewares/requireAuth";
import {User} from "../models/user";
import {NotFoundError} from "../errors/notFoundError";
import {sendSuccess} from "../utils/sendSuccess";

const router = express.Router();


router.post('/signout',requireAuth,async (req:Request,res:Response)=>{
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
    req.session= {jwt:null};

    sendSuccess(res);

})

export {
    router as signoutRoute
}
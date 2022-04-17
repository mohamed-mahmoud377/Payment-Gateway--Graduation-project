import express, {Request, Response} from "express";
import {requireAuth} from  "@hashcash/common";
import {User} from "../models/user";
import {sendSuccess} from  "@hashcash/common";
import {NotFoundError} from  "@hashcash/common";



const router = express.Router()


router.get('/me',requireAuth,async (req:Request,res:Response)=>{


    const currentuser = await User.showProfile(req.currentUser!.id)
    if (!currentuser){
           throw new  NotFoundError(['This user does not Exist'])
    }
    if (!currentuser.isActive){
        throw new  NotFoundError(['This user does not Exist'])

    }
    currentuser.isActive = undefined;

    sendSuccess(res,200,currentuser)


})

export {router as meRoute}
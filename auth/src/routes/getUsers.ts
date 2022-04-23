import express, {Request, Response} from "express";
import {BadRequestError, requireAuth, restrictTo} from "@hashcash/common";
import {User} from "../models/user";
import {NotFoundError} from  "@hashcash/common";
import {sendSuccess} from "@hashcash/common";
import {Roles} from "../types/roles";
import mongoose from "mongoose";

const router = express.Router();


router.get('/',requireAuth,restrictTo([Roles.ADMIN]),async (req:Request,res:Response)=>{

    const users = await User.find({});


    sendSuccess(res,200,users);

})

export {
    router as getUsersRoute
}
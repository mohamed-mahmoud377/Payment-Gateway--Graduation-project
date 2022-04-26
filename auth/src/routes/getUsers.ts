import express, {Request, Response} from "express";
import {BadRequestError, requireAuth, restrictTo} from "@hashcash/common";
import {User} from "../models/user";
import {NotFoundError} from  "@hashcash/common";
import {sendSuccess} from "@hashcash/common";
import {Roles} from "../types/roles";
import mongoose from "mongoose";
import {APIFilter} from "@hashcash/common";

const router = express.Router();


router.get('/',requireAuth,restrictTo([Roles.ADMIN]),async (req:Request,res:Response)=>{

    const filters  = new APIFilter(User.find({}),req.query).filter().sort().limitFields().paginate();

    const merchants = await filters.query;
    const merchantsNumber= await User.countDocuments();


    sendSuccess(res,200, {merchantsNumber,merchants},merchants.length);

})

export {
    router as getUsersRoute
}
import express, {Request, Response} from "express";
import {BadRequestError, requireAuth, restrictTo} from "@hashcash/common";
import {User} from "../models/user";
import {NotFoundError} from  "@hashcash/common";
import {sendSuccess} from "@hashcash/common";
import {Roles} from "../types/roles";
import mongoose from "mongoose";
import {query} from "express-validator";

const router = express.Router();



router.patch('/deactivate/:id',requireAuth(),restrictTo([Roles.ADMIN]),async (req:Request,res:Response)=>{
    const {id} = req.params;

    //seeing if it is a valid ID or not before going to database and also because
    // database will throw an error if is not a valid id
    if (!mongoose.isValidObjectId(id)){
        throw new NotFoundError(['user not found']);
    }
    // finding the user from the database
    const user = await User.findById(id);
    // checking if user exists or not
    if (!user){
        throw new NotFoundError(['user not found']);
    }

    // making sure that you are deactivating a merchant not any other account type
    if (user.role!==Roles.MERCHANT){
        throw new BadRequestError(['you can only deactivate merchants accounts']);
    }

    // deactivating merchant account
    user.isActive = false;

    // expiring all the merchant session to make sure that he cannot log in with his previous sessions
    user.loginSession.forEach(val =>{
        val.expired = true;
    })

    // saving all of these changes to database
    await user.save();

    sendSuccess(res,200,undefined)
})

export {
    router as deactivateMerchantRoute
}
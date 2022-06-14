import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest} from  "@hashcash/common";
import {User} from "../models/user";
import {sendSuccess} from  "@hashcash/common";

import crypto from "crypto";
import {NotAuthorizedError} from  "@hashcash/common";

const router = express.Router();

router.patch('/reset-password/:token',[
    body('newPassword')
        .notEmpty()
        .withMessage('Invalid request.')
        .bail()
        .isLength({
            min:10,max:150
        })
        .withMessage("Password must be more than 10 characters.")


],validateRequest,async (req:Request ,res:Response)=>{
    if (!req.params.token)
        throw new NotAuthorizedError();
    const {newPassword} = req.body;
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // making sure that the email is valid and exists
    const user = await User.findOne({
        passwordRestToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    }); // the only thing we know about the user at this moment

    if (!user){
        throw new NotAuthorizedError();
    }

    user.set({password:newPassword})
    user.passwordRestToken=undefined;
    user.passwordResetExpires=undefined;
    await user.save();


    sendSuccess(res,200,{});


})

export { router as resetPasswordRoute}
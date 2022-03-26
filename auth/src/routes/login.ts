import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validateRequest";
import {User} from "../models/user";

import {PasswordManger} from "../utils/passwordManger";
import {jwtGenerator} from "../utils/jwtGenerator";
import {sendSuccess} from "../utils/sendSuccess";
import {NotAuthorizedError} from "../errors/notAuthorizedError";

const router = express.Router();

router.post('/login',[
    body('email')
        .isEmail()
        .withMessage("Invalid credentials.")
        .notEmpty()
        .withMessage('Invalid credentials.'),
    body('password')
        .notEmpty()
        .withMessage('Invalid credentials.'),
    body('rememberMe')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid credentials.')

],validateRequest,async (req:Request ,res:Response)=>{
    const {email,password,rememberMe} = req.body;
    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw new NotAuthorizedError(["Invalid credentials"]);
    }
    const passwordMatch = await PasswordManger.compare(existingUser.password,password);
    if (!passwordMatch){
        throw new NotAuthorizedError(["Invalid Credentials"]);
    }
    existingUser.set({
        lastLogin:Date.now()
    })
    const payload = {
        id:existingUser.id,
        role:existingUser.role,
        email:existingUser.email
    }

    const {accessToken,refreshToken} = jwtGenerator(payload,rememberMe);

    req.session= {jwt:accessToken};
    sendSuccess(res,200,{
        accessToken,
        refreshToken,
    })
})

export { router as loginRoute}
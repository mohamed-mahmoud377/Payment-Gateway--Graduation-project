import express, {Request, Response} from "express";
import {body} from "express-validator";
import {User, UserDoc} from "../models/user";
import jwt from "jsonwebtoken";
import {NotAuthorizedError} from  "@hashcash/common";
import {jwtGenerator} from "../utils/jwtGenerator";
import {sendSuccess} from  "@hashcash/common";
import {validateRequest} from  "@hashcash/common";
import crypto from "crypto";
import {BadRequestError} from "@hashcash/common";

interface UserPayload {
    sessionId:string,
    isEmailVerified:boolean,
    id: string;
    role: string;
    email: string
}

const router = express.Router();

router.post('/refresh-access', [
    body('refreshToken')
        .notEmpty()
        .withMessage("Refresh token must be provided.")

],validateRequest, async (req: Request, res: Response) => {
    let hashedRefreshToken:string;
    const {refreshToken} = req.body
    let isValid=false;
    let payload:UserPayload;


    //why am I doing this in first not just verify the token?
    // because i need the user in the catch statement but  I will only have access to him in the try
    const userId = (jwt.decode(refreshToken) as UserPayload).id;

   if (!userId){
       throw new BadRequestError()
   }
    const user = await User.findById(userId!);
    if (!user){
        throw new BadRequestError();
    }

    hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    console.log(hashedRefreshToken);
    try{
        payload =await  jwt.verify(refreshToken,process.env.JWT_KEY!) as UserPayload;

    }catch (e) {
        if (e instanceof  jwt.TokenExpiredError){
            user!.loginSession.forEach(val => {
                if (val.token===hashedRefreshToken)
                    val.expired=true;
            })
            await user!.save()
        }
        console.log(e)

        throw new NotAuthorizedError()
    }

        user!.loginSession.forEach(val => {
            if (val.token===hashedRefreshToken){
                console.log('fuck')
                if (val.expired===false){
                    console.log('a7a')
                    isValid=true
                }
            }
        })


        if (!isValid){
            console.log('here')
            throw new NotAuthorizedError();
        }

        const {accessToken} =jwtGenerator({sessionId:payload.sessionId,id:payload.id,role:payload.role,isEmailVerified:payload.isEmailVerified,email:payload.email},false);

        req.session = {jwt:accessToken}
        return sendSuccess(res,200,{});

})


export {router as refreshAccessRoute }
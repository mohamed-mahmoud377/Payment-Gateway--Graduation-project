import express, {Request, Response} from "express";
import {body} from "express-validator";
import {User, UserDoc} from "../models/user";
import jwt from "jsonwebtoken";
import {ErrorCodes, NotAuthorizedError, Payload} from "@hashcash/common";
import {jwtGenerator} from "../utils/jwtGenerator";
import {sendSuccess} from  "@hashcash/common";
import {validateRequest} from  "@hashcash/common";
import crypto from "crypto";
import {BadRequestError} from "@hashcash/common";



const router = express.Router();

router.post('/refresh-access', [
    body('refreshToken')
        .notEmpty()
        .withMessage("Refresh token must be provided.")

],validateRequest, async (req: Request, res: Response) => {
    let hashedRefreshToken:string;
    const {refreshToken} = req.body
    let isValid=true;
    let oldPayload:Payload;


    //why am I doing this in first not just verify the token?
    // because i need the user in the catch statement but  I will only have access to him in the try
    const userId = (jwt.decode(refreshToken) as Payload).id;

   if (!userId){
       throw new NotAuthorizedError(["Invalid refresh token"],ErrorCodes.invalidToken)
   }
    const user = await User.findById(userId!);
    console.log(user)
    if (!user){
        throw new BadRequestError();
    }

    hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    console.log(hashedRefreshToken);
    try{
         oldPayload =await  jwt.verify(refreshToken,process.env.JWT_KEY_REFRESH!) as Payload;
        console.log("here")

    }catch (e) {
        if (e instanceof  jwt.TokenExpiredError){
            user!.loginSession.forEach(val => {
                if (val.token===hashedRefreshToken)
                    val.expired=true;
            })

        }
        console.log(e)

        throw new  NotAuthorizedError(["Invalid refresh token"],ErrorCodes.invalidToken)
    }
        //
        // user!.loginSession.forEach(val => {
        //     if (val.token===hashedRefreshToken){
        //         if (val.expired===false){
        //             isValid=true
        //         }
        //     }
        // })
       let loginSession =  user!.loginSession.find(loginSession=>loginSession.token===hashedRefreshToken );
    console.log(loginSession);
        if (loginSession){
            if (loginSession.expired===true)
                isValid= false
        }


        if (!isValid){
            // console.log('here')
            throw new  NotAuthorizedError(["Invalid refresh token"],ErrorCodes.invalidToken)
        }
     const payload:Payload= {sessionId:oldPayload.sessionId,
        id:user.id,role:user.role,
        isEmailVerified:user.isEmailVerified,
        email:user.email,
        verifiedMerchant:user.verifiedMerchant,
        name:user.name
        }

        const {accessToken} =jwtGenerator(payload,false);

        res.cookie("jwt",accessToken);
        return sendSuccess(res,200,{accessToken});

})


export {router as refreshAccessRoute }
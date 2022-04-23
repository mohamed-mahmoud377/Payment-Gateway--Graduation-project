import jwt from "jsonwebtoken";

export const jwtGenerator=(payload:any)=>{

    const tokenOption = {
        expiresIn: process.env.JWT_ADMIN_EXPIRES_IN
    }

    const accessToken = jwt.sign(payload,process.env.JWT_KEY!,tokenOption)

    return {accessToken }
}
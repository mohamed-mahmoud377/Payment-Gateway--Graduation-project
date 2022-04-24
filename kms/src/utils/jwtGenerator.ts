import jwt from "jsonwebtoken";

export const jwtGenerator=(payload:any,expiresIn:string |number)=>{

    const tokenOption = {
        expiresIn: expiresIn
    }

    const accessToken = jwt.sign(payload,process.env.JWT_KEY!,tokenOption)

    return {accessToken }
}
import jwt from "jsonwebtoken";

export const jwtGenerator=(payload:any,expiresIn:string |number,secret:string)=>{

    const tokenOption = {
        expiresIn: expiresIn
    }


    return jwt.sign(payload, secret, tokenOption)
}


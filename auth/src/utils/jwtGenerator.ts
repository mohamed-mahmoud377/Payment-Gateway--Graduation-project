import jwt from "jsonwebtoken";

export const jwtGenerator=(payload:any)=>{
   let accessOptions ;
    let refreshOptions ;
    if (process.env.NODE_ENV==='production'){
        accessOptions = {expiresIn:Number(process.env.JWT_ACCESS_EXPIRES_IN)}
        refreshOptions = {expiresIn:process.env.JWT_REFERSH_EXPIRES_IN}
    }else{
        accessOptions = {expiresIn:3*60}
        refreshOptions = {expiresIn:15*60}
    }

    const accessToken = jwt.sign(payload,process.env.JWT_KEY!,accessOptions)
    const refreshToken = jwt.sign(payload,process.env.JWT_KEY!,refreshOptions)
    return {accessToken,refreshToken }
}
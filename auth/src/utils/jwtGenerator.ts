import jwt from "jsonwebtoken";

export const jwtGenerator=(payload:any,rememberMe:boolean=false)=>{
   let accessOptions ;
    let refreshOptions ;
    if (process.env.NODE_ENV==='production' ||process.env.NODE_ENV==='test' ){
        if (rememberMe){
            refreshOptions = {expiresIn:process.env.JWT_REFERSH_EXPIRES_IN_REMEMBER}
        }else{
            refreshOptions = {expiresIn:process.env.JWT_REFERSH_EXPIRES_IN}
        }
        accessOptions = {expiresIn:Number(process.env.JWT_ACCESS_EXPIRES_IN)}

    }else{
        accessOptions = {expiresIn:30}
        refreshOptions = {expiresIn:1*60}
    }

    const accessToken = jwt.sign(payload,process.env.JWT_KEY!,accessOptions)
    const refreshToken = jwt.sign(payload,process.env.JWT_KEY!,refreshOptions)
    return {accessToken,refreshToken }
}
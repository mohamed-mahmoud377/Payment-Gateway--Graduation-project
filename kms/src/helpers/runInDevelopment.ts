
import {Token} from "../models/tokens";
import crypto from "crypto";

//will run only in development mode
export const runInDevelopment =async () => {
    if (process.env.NODE_ENV==='development'){
        let  accessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlTmFtZSI6InRva2VuaXphdGlvbiIsIm1hc3RlcklkIjoiODQ2ZWI2MTE3NDE3OWVmODZhNGFiMzE2ZWY1NzFhOTNlMzljNjljODE1NTdlNDNjNGIwMmEzNDM0YmExY2Q4ZSIsImlhdCI6MTY1MTEwMzQyMywiZXhwIjoxNjU5NzQzNDIzfQ.4DbfLc3mIsPb1iPxCFu6BRnR-GFNE4QRQwD7cXXmdNs";
        accessToken = crypto.createHash('sha256').update(accessToken).digest('hex');

        // created an admin to be able to access any protected route in development
        const token =  new Token({
            token:accessToken,
            from:'tokenization',
        })
        await  token.save();
        console.log('saved access token for dev')

    }
}
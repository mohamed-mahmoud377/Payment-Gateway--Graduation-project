
import {AccessToken} from "../models/accessToken";
import crypto from "crypto";
import {Token} from "../models/token";

//will run only in development mode

const generateServiceAccessToken =async ()=>{
    const tokens = await AccessToken.find({});
    if (tokens.length>0)
        return;
    let  accessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlTmFtZSI6InByb2Nlc3NQYXltZW50IiwiaWF0IjoxNjUyMjMwMDc4LCJleHAiOjE2NjA4NzAwNzh9.SYo5uI-FG-tNdqLTtX2IaG198zI6AmST84bE6BLzmUk";
    accessToken = crypto.createHash('sha256').update(accessToken).digest('hex');
    // created an admin to be able to access any protected route in development
    const token =  new AccessToken({
        token:accessToken,
        from:'processPayment',
    })
    await  token.save();
    console.log('saved access token for dev')

}

export const runInDevelopment =async (options={
    generateServiceAccessToken:true
}) => {
    if (process.env.NODE_ENV==='production'){
        if (options.generateServiceAccessToken)
            await generateServiceAccessToken();


    }

}
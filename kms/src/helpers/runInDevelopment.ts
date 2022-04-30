
import {Token} from "../models/tokens";
import crypto from "crypto";
import {generateKey} from "../utils/generateKey";
import {Key} from "../models/key";
import {Admin} from "../models/admin";

//will run only in development mode
const generateAccessToken =async ()=>{
    const tokens = await Token.find({});
    if (tokens.length>0)
        return;
    let  accessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlTmFtZSI6InRva2VuaXphdGlvbiIsIm1hc3RlcklkIjoiODQ2ZWI2MTE3NDE3OWVmODZhNGFiMzE2ZWY1NzFhOTNlMzljNjljODE1NTdlNDNjNGIwMmEzNDM0YmExY2Q4ZSIsImlhdCI6MTY1MTM0NzE1NSwiZXhwIjoxNjU5OTg3MTU1fQ.FUqMgTQB9yxU0zTAMfB6bZo2XQj0XjNawnmmpP2PgyQ";
    accessToken = crypto.createHash('sha256').update(accessToken).digest('hex');

    // created an admin to be able to access any protected route in development
    const token =  new Token({
        token:accessToken,
        from:'tokenization',
    })
    await  token.save();
    console.log('saved access token for dev')

}

const generateAdminUser = async ()=>{
    const admin = await Admin.find({});
    if (admin.length>0)
        return;
    await  Admin.create(
        {
            email:'mohamedmahmoud3776@gmail.com',
            password:'admin',
            name:'mohamed mahmoud'
        }
    )
}

const generateMasterKey = async ()=>{
    const keys = await Key.find({});
    if (keys.length>0)
        return;
    let key = new Key({
        _id:"62677e0bcbe6b872c7c6214a",
        key:"2dc38ac4b55db784ff0afa28e82394391b29fcf28ddffdb03a25e7071097a725.1b374c8c203a563cd589175a024e6649"
    })
    key =await key.save();

    // this first hash is going to be sent for the user because we will not send the real ID
    const hashedId  =crypto.createHash('sha256').update(key.id).digest('hex');
    // but this is going to be saved in the database because this will our only way to know the user by hashing the hash
    // that they will give us
    const hashedSecondTime =  crypto.createHash('sha256').update(hashedId).digest('hex');
    key.set({hashedId: hashedSecondTime});
    await key.save();

}



export const runInDevelopment =async (options={
    generateAccessToken:true,
    generateAdminUser:true,
    generateMasterKey:true,

}) => {
    if (process.env.NODE_ENV==='development'){
        if(options.generateMasterKey)
            await generateMasterKey();
        if (options.generateAdminUser)
            await generateAdminUser();
        if (options.generateAccessToken)
            await generateAccessToken();





    }






}
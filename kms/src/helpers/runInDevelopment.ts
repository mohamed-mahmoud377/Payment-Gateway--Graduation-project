
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
    let  accessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlTmFtZSI6InRva2VuaXphdGlvbiIsIm1hc3RlcklkIjoiMDViZjNmODZhN2RlNWViM2Q5MTdhZWNlZWU4MmMyNGNjNmI5NGZjZDgyNTkwZTNkMjM1YjdmNjIyM2E2NWRhNCIsImlhdCI6MTY1MjIyODY0NCwiZXhwIjoxNjYwODY4NjQ0fQ.llSCI8yU42PsRx8L6iOcatFRKg6EANyCUCS1pIeIbJs";
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
        _id:"627b01f80a2341696785de85",
        key:"84882661c1afc0247d645524b9dc3f9bc8d3828d0af4b9319d21d6a725b54beb.0ea052957387ac3979328d4357fc2257"
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
    if (process.env.NODE_ENV==='development'||process.env.NODE_ENV==='production'){
        if(options.generateMasterKey)
            await generateMasterKey();
        if (options.generateAdminUser)
            await generateAdminUser();
        if (options.generateAccessToken)
            await generateAccessToken();





    }






}
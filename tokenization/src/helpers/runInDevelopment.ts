
import {AccessToken} from "../models/accessToken";

//will run only in development mode
export const runInDevelopment =async () => {
    if (process.env.NODE_ENV==='development'){

        // created an admin to be able to access any protected route in development
        const token =  new AccessToken({
            token:"0e3c014830bad01ff6b4d8b25d118177d3e89bf9b19846ccc8f674b02aae65fb",
            from:'processPayment',
        })
        await  token.save();
        console.log('saved access token for dev')

    }
}
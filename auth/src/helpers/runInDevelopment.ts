import {User} from "../models/user";
import {Roles} from "../types/roles";

//will run only in development mode
export const runInDevelopment =async () => {
    if (process.env.NODE_ENV==='development'){

        // created an admin to be able to access any protected route in development
        await User.create({
            name:'admin',
            role:Roles.ADMIN,
            email:'mohamedmahmoud3776@gmail.com',
            password:'admin12345',
            isEmailVerified:true,
        })

    }
}
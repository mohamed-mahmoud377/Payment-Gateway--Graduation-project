import mongoose from "mongoose";
import {UserDoc} from "../models/user";

export const generateFackUsers=async (User :mongoose.Model<UserDoc>)=>{
    let bool1 = false;
    let bool2= true;
    let bool3 =  false;

    for (let i = 1; i <=100000 ; i++) {

        bool1 = i % 2 === 0;
        bool2 = i % 3 === 0;
        bool3 = i%5 !==  0;
       await  User.create({
            email:`test${i}@test.com`,
            name: `test${i} jerry`,
            isEmailVerified:bool1,
            twoWayAuth:bool2,
            isActive:bool3,
           password:"pass12345",
        })
    }

}
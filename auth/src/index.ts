import {app} from './app'
import mongoose from "mongoose";
import {Merchant} from "./models/merchant";


const start = async ()=>{
    console.log('Starting up ...')

    if (!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }
    if (!process.env.MONGO_URI){
        throw new Error("MONGO_URI must be defined !")
    }

    try{

        await mongoose.connect(process.env.MONGO_URI!);
        console.log("connected to database successfully")
        // setInterval(function(){
        //     //this code runs every second
        // }, 10000);

    }catch (e) {

        console.log(e)
    }

    app.listen(3000,()=>{
        console.log('authentication srv is up and running on port 3000  ')
    })
}



start();
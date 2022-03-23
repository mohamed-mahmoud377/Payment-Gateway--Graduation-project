import {app} from './app'
import mongoose from "mongoose";



const start = async ()=>{
    console.log('Starting up ...')

    try{

        await mongoose.connect(process.env.MONGO_URI!);
        console.log("connected to database successfully")

    }catch (e) {
        console.log(e)
    }

    app.listen(3000,()=>{
        console.log('authentication srv is up and running on port 3000  ')
    })
}



start();
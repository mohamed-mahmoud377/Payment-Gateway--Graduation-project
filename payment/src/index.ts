import {app} from './app'
import mongoose from "mongoose";
import {natsWrapper} from "./nats/nats-wrapper";





const start = async ()=>{
    console.log('Starting up payment service...')

    if (!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }
    if (!process.env.MONGO_URI){
        throw new Error("MONGO_URI must be defined !")
    }
    if (!process.env.NATS_CLIENT_ID){
        throw new Error("NATS_CLIENT_ID must be defined !")
    }
    if (!process.env.NATS_URL){
        throw new Error("NATS_URL must be defined !")
    }
    if (!process.env.NATS_CLUSTER_ID){
        throw new Error("NATS_CLUSTER_ID must be defined !")
    }
    try{
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID,process.env.NATS_URL)
        natsWrapper.client.on('close',()=>{
            console.log("NATS connection closed !")
            process.exit();
        })

        // why are we doing this ?
        // because when the program close NATS still try to reach it but we closed ! like on purpose
        // so in the closing process we tell NATS that we want to close the connection immediately
        // so we don't waste time trying  to reach it

        process.on('SIGINT',()=>natsWrapper.client.close()); // this for when you close the program with ctrl z
        process.on('SIGTERM',()=>natsWrapper.client.close()); // this when docker tries to kill the process gracefully


        await mongoose.connect(process.env.MONGO_URI!);
        console.log("connected to database successfully")







    }catch (e) {

        console.log(e)
    }

    app.listen(3000,()=>{
        console.log('payment srv is up and running on port 3000  ')
    })
}



start();
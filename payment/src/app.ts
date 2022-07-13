import express from "express";
import 'express-async-errors'
import bodyParser from 'body-parser'
import {errorHandler, secure} from "@hashcash/common";


import cookieParser from "cookie-parser";
import {getPaymentsRoute} from "./routes";
import {getPaymentRoute} from "./routes/show";


const app= express();

app.set('trust proxy',true);

app.use(bodyParser.json());

secure(app,{
    bodyLimiting: true,
    compression: true,
    cors: true,
    helmet: true,
    noSQLInjectionSanitization: true,
    rateLimiter: true,
    xss: true
})


app.use(cookieParser())



app.use('/api/payment',
getPaymentsRoute
    ,getPaymentRoute
)



app.use(errorHandler)

 export {app}
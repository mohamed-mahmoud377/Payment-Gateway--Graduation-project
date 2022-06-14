import express from "express";
import 'express-async-errors'


import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import {errorHandler, secure} from "@hashcash/common";
import {loginRoute} from "./routes/login";
import {otpRegisterRoute} from "./routes/otpRegister";
import {generateMasterRoute} from "./routes/generateMaster";
import {getKeyRoute} from "./routes/getKey";
import {getKeysRoute} from "./routes/getKeys";
import {deleteKeyRoute} from "./routes/deleteKey";
import {getServiceAccessToken} from "./routes/getServiceAccessToken";
import {getTokens} from "./routes/getTokens";
import {dataEncryptKey} from "./routes/dataEncryptKey";
import {decryptDataEncryptKey} from "./routes/decryptDataEncryptKey";
import {deleteToken} from "./routes/deleteToken";
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

// app.use(cookieSession({
//     signed:false,
//     secure: false// note that even in production you will have to disable it
// }))
app.use(cookieParser());

app.use('/api/kms',deleteToken)
app.use('/api/kms',decryptDataEncryptKey);
app.use('/api/kms',dataEncryptKey)
app.use('/api/kms',loginRoute)
app.use('/api/kms',getTokens)
app.use('/api/kms',deleteKeyRoute)
app.use('/api/kms',getKeyRoute)
app.use('/api/kms',getKeysRoute)
app.use('/api/kms',otpRegisterRoute)
app.use('/api/kms',generateMasterRoute)
app.use('/api/kms',getServiceAccessToken);
app.use(errorHandler)
 export {app}
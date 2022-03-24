import express from "express";
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from "cookie-session";
import {checkPasswordRoute} from "./routes/checkPassword";
import {errorHandler} from "./middlewares/errorHandler";
import {signupRoute} from "./routes/signup";
const app= express();

app.set('trust proxy',true);

app.use(bodyParser.json());

app.use(cookieSession({
    signed:false,
    secure: false// note that even in production you will have to disable it
}))


app.use("/api/users",checkPasswordRoute);
app.use("/api/users",signupRoute);

app.use(errorHandler)

 export {app}
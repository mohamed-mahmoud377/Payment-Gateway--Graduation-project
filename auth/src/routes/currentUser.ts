import express, {Request, Response} from 'express';
import {requireAuth} from "../middlewares/requireAuth";




const router = express.Router();


router.get('/current-user',requireAuth,(req:Request ,res:Response)=>{

    res.send({currentUser: req.currentUser });

})

export { router as currentUser}
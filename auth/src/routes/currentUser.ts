import express, {Request, Response} from 'express';
import {requireAuth} from  "@hashcash/common";




const router = express.Router();


router.get('/current-user',requireAuth,(req:Request ,res:Response)=>{

    res.send({currentUser: req.currentUser });

})

export { router as currentUserRoute}
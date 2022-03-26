import express from 'express';
import {requireAuth} from "../middlewares/requireAuth";




const router = express.Router();


router.get('/current-user',requireAuth,(req ,res)=>{

    res.send({currentUser: req.currentUser });

})

export { router as currentUser}
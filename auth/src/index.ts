
import express ,{Request,Response} from 'express';

import 'express-async-errors'
const app  = express();

app.get('/api/users/jerry', (req:Request, res:Response)=>{
    res.send('hello feysl')
})

app.listen(3000,()=>{
    console.log("listening on port 4444....    ")
})

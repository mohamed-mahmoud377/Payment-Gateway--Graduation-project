
import express ,{Request,Response} from 'express';

import 'express-async-errors'
const app  = express();

app.get('/jerry', (req:Request, res:Response)=>{
    res.send('hello feysl')
})

app.listen(4444,()=>{
    console.log("listening on port 4444...")
})

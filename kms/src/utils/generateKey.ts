import {createCipheriv,randomBytes,createDecipheriv} from 'crypto'

export const generateKey =(keyBytesNum:number,IVBytesNum:number )=> {
 const  key = randomBytes(keyBytesNum).toString('hex');
 const iv  = randomBytes(IVBytesNum).toString('hex');
 return `${key}.${iv}`
}
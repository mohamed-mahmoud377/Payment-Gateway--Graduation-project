import {createCipheriv} from "crypto";

export const encrypt = (data:any, key:string) => {
         const [actualKey,iv] = key.split('.');
    const cipher = createCipheriv('aes256',actualKey,iv);

    return cipher.update(JSON.stringify(data),'utf8','hex')+cipher.final('hex')
}
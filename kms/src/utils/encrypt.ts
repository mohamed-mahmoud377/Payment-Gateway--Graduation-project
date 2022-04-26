import {createCipheriv} from "crypto";

export const encrypt = (data: string |any, key:string) => {
    console.log(key)
         const [actualKey,iv] = key.split('.');
    console.log(actualKey , iv);
         const ivBuffer = Buffer.from(iv,"hex")
        const keyBuffer = Buffer.from(actualKey,"hex")
    const cipher = createCipheriv('aes256',keyBuffer,ivBuffer);
        // if (!(data instanceof String))
        //     data = JSON.stringify(data);

    return cipher.update(data,'utf8','hex')+cipher.final('hex')
}
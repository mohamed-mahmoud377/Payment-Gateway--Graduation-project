import {createDecipheriv} from "crypto";

export const decrypt = (encryptedMessage:string,key:string) => {
    const [actualKey,iv] = key.split('.');
    const ivBuffer = Buffer.from(iv,"hex")
    const keyBuffer = Buffer.from(actualKey,"hex")
    const decipher = createDecipheriv('aes256',keyBuffer,ivBuffer);
    return decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');
}
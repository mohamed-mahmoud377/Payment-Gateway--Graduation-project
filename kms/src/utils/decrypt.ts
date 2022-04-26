import {createDecipheriv} from "crypto";

export const decrypt = (encryptedMessage:string,key:string) => {
    const [actualKey,iv] = key.split('.');
    const decipher = createDecipheriv('aes256',actualKey,iv);
    return decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');
}
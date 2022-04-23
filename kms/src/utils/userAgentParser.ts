import parser from "ua-parser-js";

export const userAgentParser =(userAgent:string)=>{
    const browser = parser(userAgent).browser.name;
    const os = parser(userAgent).os.name;
    const device = parser(userAgent).device.type
    return {browser,os, device};
}
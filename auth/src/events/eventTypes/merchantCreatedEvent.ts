import {Subjects} from "../Subjects";

export interface MerchantCreatedEvent{
    subject:Subjects.merchantCreated;
    data:{
        email:string,
        merchantId:string,
        name:string;
        otp:number;
    }
}
import {Subjects} from "../Subjects";

export interface UserCreatedEvent{
    subject:Subjects.userCreated;
    data:{
        email:string,
        merchantId:string,
        name:string;
        otp:number;
    }
}
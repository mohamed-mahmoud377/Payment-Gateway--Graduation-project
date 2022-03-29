import {Subjects} from "../Subjects";

export interface UserLoggingInEvent{
    subject:Subjects.userLoggingIn;
    data:{
        email:string,
        userId:string,
        name:string;
        otp:number;
    }
}
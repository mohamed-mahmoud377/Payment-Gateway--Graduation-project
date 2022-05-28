import {Subjects} from "../Subjects";

export interface EmailVerifiedEvent{
    subject:Subjects.emailVerified;
    data:{
        email:string,
        userId:string,
        name:string;
    }
}
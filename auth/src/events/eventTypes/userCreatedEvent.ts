import {Subjects} from "../Subjects";

export interface UserCreatedEvent{
    subject:Subjects.userCreated;
    data:{
        email:string,
        userId:string,
        name:string;
        otp:number;
    }
}
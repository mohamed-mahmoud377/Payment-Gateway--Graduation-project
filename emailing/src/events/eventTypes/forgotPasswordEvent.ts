import {Subjects} from "../Subjects";

export interface UserForgotPasswordEvent{
    subject:Subjects.userForgotPassword;
    data:{
        email:string,
        userId:string,
        name:string;
        url:string;
    }
}
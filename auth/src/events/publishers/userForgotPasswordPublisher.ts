import {Publisher} from "./publisher";
import {Subjects} from "../Subjects";
import {UserCreatedEvent} from "../eventTypes/userCreatedEvent";
import {UserForgotPasswordEvent} from "../eventTypes/forgotPasswordEvent";

export class UserForgotPasswordPublisher extends Publisher<UserForgotPasswordEvent>{
    subject: UserForgotPasswordEvent["subject"]=Subjects.userForgotPassword;

}
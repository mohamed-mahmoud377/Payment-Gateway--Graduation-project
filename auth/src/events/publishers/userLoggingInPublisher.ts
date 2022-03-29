import {Publisher} from "./publisher";
import {Subjects} from "../Subjects";
import {UserCreatedEvent} from "../eventTypes/userCreatedEvent";
import {UserLoggingInEvent} from "../eventTypes/userLoggingInEvent";

export class UserLoggingInPublisher extends Publisher<UserLoggingInEvent>{
    subject: UserLoggingInEvent["subject"]=Subjects.userLoggingIn;

}
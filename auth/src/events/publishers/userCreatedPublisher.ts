import {Publisher} from "./publisher";
import {Subjects} from "../Subjects";
import {UserCreatedEvent} from "../eventTypes/userCreatedEvent";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent>{
    subject: UserCreatedEvent["subject"]=Subjects.userCreated;

}
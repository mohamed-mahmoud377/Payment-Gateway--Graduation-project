import {Publisher} from  "@hashcash/common";
import {Subjects} from "@hashcash/common";
import {UserCreatedEvent} from "@hashcash/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent>{
    subject: UserCreatedEvent["subject"]=Subjects.userCreated;

}
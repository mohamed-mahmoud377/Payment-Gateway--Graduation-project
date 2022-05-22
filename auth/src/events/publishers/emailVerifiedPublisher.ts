import {EmailVerifiedEvent, Publisher, Subjects, UserCreatedEvent} from "@hashcash/common";

export class EmailVerifiedPublisher extends Publisher<EmailVerifiedEvent>{
    subject: EmailVerifiedEvent["subject"]=Subjects.emailVerified;

}
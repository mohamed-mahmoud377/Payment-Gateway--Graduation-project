import {Publisher} from  "@hashcash/common";
import {Subjects} from  "@hashcash/common";

import {UserLoggingInEvent} from  "@hashcash/common";

export class UserLoggingInPublisher extends Publisher<UserLoggingInEvent>{
    subject: UserLoggingInEvent["subject"]=Subjects.userLoggingIn;

}
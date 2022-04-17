import {Publisher} from  "@hashcash/common";
import {Subjects} from  "@hashcash/common";

import {UserForgotPasswordEvent} from  "@hashcash/common";

export class UserForgotPasswordPublisher extends Publisher<UserForgotPasswordEvent>{
    subject: UserForgotPasswordEvent["subject"]=Subjects.userForgotPassword;

}
import {Listener} from  "@hashcash/common";
import {Message} from "node-nats-streaming";

import {Subjects} from "@hashcash/common";
import {Email} from "../../emails/emails";
import {UserLoggingInEvent} from  "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
export class UserLoggingInListener extends Listener<UserLoggingInEvent>{
    queueGroupName: string= queueGroupName;

    subject: UserLoggingInEvent["subject"]= Subjects.userLoggingIn;

    async onMessage(data: UserLoggingInEvent["data"], msg: Message){

        await new Email(data.email,data.name).sendOtpLogin(data.otp)
        msg.ack();
    }


}
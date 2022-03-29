import {Listener} from "./listener";
import {Message} from "node-nats-streaming";

import {Subjects} from "../Subjects";
import {Email} from "../../emails/emails";
import {UserLoggingInEvent} from "../eventTypes/userLoggingInEvent";
export class UserLoggingInListener extends Listener<UserLoggingInEvent>{
    queueGroupName: string= "emailing-srv";

    subject: UserLoggingInEvent["subject"]= Subjects.userLoggingIn;

    async onMessage(data: UserLoggingInEvent["data"], msg: Message){

        await new Email(data.email,data.name).sendOtpLogin(data.otp)
        msg.ack();
    }


}
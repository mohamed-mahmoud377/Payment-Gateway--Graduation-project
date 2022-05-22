import {EmailVerifiedEvent, Listener, Subjects} from "@hashcash/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "./queueGroupName";

export class EmailVerifiedListener extends Listener<EmailVerifiedEvent>{

    queueGroupName: string=queueGroupName ;
    subject: EmailVerifiedEvent["subject"]= Subjects.emailVerified;

    onMessage(data: EmailVerifiedEvent["data"], msg: Message) {
        console.log("fuck yeah")
        msg.ack();
    }


}
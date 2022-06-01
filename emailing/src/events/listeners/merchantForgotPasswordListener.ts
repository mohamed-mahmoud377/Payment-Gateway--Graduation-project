import {Listener} from  "@hashcash/common";
import {Message} from "node-nats-streaming";
import {Subjects} from  "@hashcash/common";
import {Email} from "../../emails/emails";
import {UserForgotPasswordEvent} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
export class MerchantForgotPasswordListener extends Listener<UserForgotPasswordEvent>{
    queueGroupName: string= queueGroupName;

    subject: UserForgotPasswordEvent["subject"]= Subjects.userForgotPassword;

    async onMessage(data: UserForgotPasswordEvent["data"], msg: Message){

        await new Email(data.email,data.name,data.url).sendPasswordRest()
        msg.ack();
    }


}
import {Listener} from  "@hashcash/common";
import {Message} from "node-nats-streaming";
import {Subjects} from  "@hashcash/common";
import {Email} from "../../emails/emails";
import {UserForgotPasswordEvent} from "@hashcash/common";
export class MerchantForgotPasswordListener extends Listener<UserForgotPasswordEvent>{
    queueGroupName: string= "emailing-srv";

    subject: UserForgotPasswordEvent["subject"]= Subjects.userForgotPassword;

    async onMessage(data: UserForgotPasswordEvent["data"], msg: Message){

        await new Email(data.email,data.name,data.url).sendPasswordRest()
        msg.ack();
    }


}
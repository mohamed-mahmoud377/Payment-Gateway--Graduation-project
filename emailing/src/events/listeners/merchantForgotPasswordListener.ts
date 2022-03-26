import {Listener} from "./listener";
import {Message} from "node-nats-streaming";
import {UserCreatedEvent} from "../eventTypes/userCreatedEvent";
import {Subjects} from "../Subjects";
import {Email} from "../../emails/emails";
import {UserForgotPasswordEvent} from "../eventTypes/forgotPasswordEvent";
export class MerchantForgotPasswordListener extends Listener<UserForgotPasswordEvent>{
    queueGroupName: string= "emailing-srv";

    subject: UserForgotPasswordEvent["subject"]= Subjects.userForgotPassword;

    async onMessage(data: UserForgotPasswordEvent["data"], msg: Message){

        await new Email(data.email,data.name,data.url).sendPasswordRest()
        msg.ack();
    }


}
import {EmailVerifiedEvent, Listener, Modes, Subjects} from "@hashcash/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "../../types/queueGroupName";
import {Keys} from "../../models/keys";
import {generateKey} from "../../utils/generateKey";


export class EmailVerifiedListener extends Listener<EmailVerifiedEvent>{

    queueGroupName: string=queueGroupName ;
    subject: EmailVerifiedEvent["subject"]= Subjects.emailVerified;

   async onMessage(data: EmailVerifiedEvent["data"], msg: Message) {
        const keys= Keys.build({
            userId: data.userId, verifiedMerchant: false,
            mode: Modes.TEST, testCreatedAt: new Date(Date.now()), testKey: generateKey(Modes.TEST)

        })

        await keys.save();
        msg.ack();
    }


}
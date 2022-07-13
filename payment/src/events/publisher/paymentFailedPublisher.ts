import {Publisher, Subjects} from "@hashcash/common";
import {PaymentFailedEvent} from "@hashcash/common"

export class PaymentFailedPublisher extends Publisher<PaymentFailedEvent>{
    subject: PaymentFailedEvent["subject"]= Subjects.PaymentFailed;
}


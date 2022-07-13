import {Publisher, Subjects} from "@hashcash/common";
import {PaymentRequestEvent} from "@hashcash/common";

export class PaymentRequestPublisher extends Publisher<PaymentRequestEvent>{
    subject: PaymentRequestEvent["subject"]= Subjects.PaymentRequestCreated;
}


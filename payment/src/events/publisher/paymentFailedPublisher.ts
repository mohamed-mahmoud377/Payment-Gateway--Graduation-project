import {Publisher, Subjects} from "@hashcash/common";
import {PaymentFailedEvent} from "../eventsTypes/paymentFailedEvent";

export class PaymentFailedPublisher extends Publisher<PaymentFailedEvent>{
    subject: PaymentFailedEvent["subject"]= Subjects.PaymentFailed;
}


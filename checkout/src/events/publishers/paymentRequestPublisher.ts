import {Publisher, Subjects} from "@hashcash/common";
import {PaymentRequestEvent} from "../eventsTypes/paymentRequestEvent";

export class PaymentRequestPublisher extends Publisher<PaymentRequestEvent>{
    subject: PaymentRequestEvent["subject"]= Subjects.PaymentRequestCreated;

}


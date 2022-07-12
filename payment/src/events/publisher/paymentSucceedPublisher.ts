import {Publisher, Subjects} from "@hashcash/common";
import {PaymentSucceedEvent} from "../eventsTypes/paymentSucceedEvent";

export class PaymentSucceedPublisher extends Publisher<PaymentSucceedEvent>{
    subject: PaymentSucceedEvent["subject"]= Subjects.PaymentSucceed;
}


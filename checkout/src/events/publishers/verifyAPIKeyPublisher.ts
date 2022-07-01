import {Publisher, Subjects} from "@hashcash/common";
import {VerifyAPIKeyEvent} from "../eventsTypes/verifyAPIKeyEvent";

export class VerifyAPIKeyPublisher extends Publisher<VerifyAPIKeyEvent>{
    subject: VerifyAPIKeyEvent["subject"]= Subjects.verifyAPIKey;

}


import {Publisher, Subjects} from "@hashcash/common";
import {VerifyAPIKeyEvent} from "@hashcash/common";

export class VerifyAPIKeyPublisher extends Publisher<VerifyAPIKeyEvent>{
    subject: VerifyAPIKeyEvent["subject"]= Subjects.verifyAPIKey;

}


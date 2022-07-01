import {Subjects} from "@hashcash/common";


export interface VerifyAPIKeyEvent {
    subject:Subjects.verifyAPIKey;
    data:{

        apikey:string;
        checkoutSessionId:string;

    }
}
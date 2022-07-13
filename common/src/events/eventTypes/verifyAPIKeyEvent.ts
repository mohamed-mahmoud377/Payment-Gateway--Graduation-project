import {Subjects} from "../Subjects";


export interface VerifyAPIKeyEvent {
    subject:Subjects.verifyAPIKey;
    data:{

        apikey:string;
        checkoutSessionId:string;


    }
}
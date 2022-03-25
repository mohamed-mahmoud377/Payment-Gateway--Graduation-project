import {Message, Stan} from "node-nats-streaming";
import {Subjects} from "../Subjects";

interface Event { //this the makes the rules for any other events that it have to have subject and data
    // and the subject has to be a subject
    // but why data is any because every event is going to have different definition of the data
    // but at least we make sure that we're always going to have data
    subject:Subjects;
    data:any;
}

export abstract class Listener<T extends Event> { // note that the T type that can be anything has is extending event means that  it
    // has to have all of its prop which really makes sure to make everything right
    abstract subject:T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data:T['data'],msg:Message):void;
    protected client: Stan;
    protected ackWait = 5 * 1000;

    constructor(client:Stan) {
        this.client = client;
    }
    subscriptionOptions(){
        return this.client.subscriptionOptions()
            .setManualAckMode(true) // this option tells nats that you have to ack the msg or it will try to send again
            // after 30s to the same service or other member or the queue
            .setDeliverAllAvailable()   // to get all event that this service has missed in the past not super efficient because you will always need all the data v
            // but you use for the very first time
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName) // this will make sure that you don't get any event that has been ack to this durable name
        // you imagine this the services is up and running to the very first time so setDeliverAllAvailable will let it get all events
        // that it has missed but when it goes out again and then back up it only get events that it acutely just missed because
        // while it is running any event it will process will be marked because of the durable name so it will get only the events
        // that is not in the durable name
    }

    listen(){
        const subscription = this.client.subscribe(this.subject,this.queueGroupName,this.subscriptionOptions())
        subscription.on('message', (msg:Message)=>{
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`)
            const parsedData = this.parseMessage(msg)
            this.onMessage(parsedData,msg);


        })
    }


    parseMessage(msg:Message){
        const data = msg.getData();
        return typeof  data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'))
    }
}

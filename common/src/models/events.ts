
import mongoose from "mongoose";
import {Subjects} from "../events/Subjects";
const dataScheme = new mongoose.Schema({},{strict:false})
interface EventAttr{
    subject:Subjects;
    sent:boolean;
    data:any;
}

interface EventDoc extends mongoose.Document{
    subject:Subjects;
    sent:boolean;
    data:mongoose.Schema;
}

interface EventModel extends mongoose.Model<EventDoc>{
    build(attrs:EventAttr):EventDoc;
}

const eventScheme = new mongoose.Schema({
    subject:{
        type:String,
        required:true,
        enum:Subjects
    },
    sent:{
        type:Boolean,
        default:false
    },
    data:dataScheme
})
eventScheme.statics.build = (attrs:EventAttr)=>{
    return new Event(attrs);

}

const Event  = mongoose.model<EventDoc,EventModel>('Event',eventScheme);

export {Event as EventModel, EventDoc,EventAttr,eventScheme}
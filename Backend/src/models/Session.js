import mongoose, { mongo } from "mongoose";

const sessionSchema=new mongoose.Schema({
    problem:{
        type:String,
        required: true,
    },
    difficulty:{
        type:String,
        enum:["Easy", "Medium", "Hard"],
        required: true,
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },
    status:{
        type:String,
        enum:["Active", "Completed"],
        default:"Active"
    },
    callId:{
        type:String,
        default:""
    }
}, {timestamps:true})

const Session=new mongoose.model("Session", sessionSchema)
export default Session;
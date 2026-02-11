import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js"
export async function createSession(req, res) {
    try {
        const { problem, difficulty } = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if (!problem || !!difficulty) {
            return res.status(400).json({ message: "Problem and Diffuculty are Required" })
        }

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        const session = await Session.create({
            problem,
            difficulty,
            host: userId,
            callId,
        })

        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                createdById: clerkId,
                custom: { problem, difficulty, sessionId: session._id.toString() },
            }
        })
        const channel = chatClient.channel("message", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId]
        })
        return res.status(200).json({
            message: "Session Created Successfully",
            session: session,
        })
        await channel.create()
    } catch (error) {
        console.log("Error Creating session", error);
        return res.status(500).json({ message: "Failed to Create Session" })
    }
}
export async function getActiveSession(req, res) {
    try {
        const session = await Session.find({ status: "Active" })
            .populate("host", "name email profileImage clerkId")
            .sort({ createdAt: -1 })
            .limit(20);

        if (!session) {
            return res.status(200).json({ message: "There is no Active Session" })
        }

        return res.status(200).json({
            message: "Session Find Successfully",
            session,
        })
    } catch (error) {
        console.log("Error in Getting Session", error);
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}
export async function getMyRecentSession(req, res) {
    try {
        const userId = req.user._id;

        const session = await Session.find({
            status: "Completed",
            $or: [{ host: userId }, { participant: userId }],
        }).sort({ createdAt: -1 }).limit(20)

        if (!session) {
            return res.status(400).json({
                message: "There are No Recent Session",
            })
        }

        return res.status(200).json({
            message: "Recent Session Fetch Successfully",
            session,
        })
    } catch (error) {
        console.log("Error in fetching past session", error);
        return res.status(500).json({ message: "Internal server Error" })
    }
}
export async function getSessionById(req, res) {
    try {
        const {id}=req.params;

        const session= await Session.findById(id)
        .populate("host","name email profileImage clerkId")
        .populate("participant","name email profileImage clerkId")

        if(!session){
            return res.status(400).json({message:"Session Not Found"});
        }

        return res.status(200).json({
            message:"Session Fetch Successfully",
            session,
        })
    } catch (error) {
        console.log("Error Fetching Session By Id", error);
        return res.status(500).json({message:"Internal server Error"});
    }
}
export async function joinSession(req, res) {
    try {
        const {id}=req.params;;
        const userId=req.user._id;
        const clerkId=req.user.clerkId;
        const session= await Session.findById(id);

        if(!session){
            return res.status(400).json({message:"Session Not Found"});
        }

        if(session.status==="Completed"){
            return res.status(400).json({message:"Session is Already Completed"});
        }

        if(session.participant){
            return res.status(409).json({message:"Session is Full"});
        }

        session.participant=userId;
        await session.save();

        const channel = chatClient.channel("message", session.callId);
        await channel.addMembers([clerkId]);
        return res.status(200).json({
            message:"Joined Session Successfully",
            session,
        })

    } catch (error) {
        console.log("Error Joining Session", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
export async function endSession(req, res) {
    try {
        const {id}=req.params;
        const userId=req.user._id;
        const clerkId=req.user.clerkId;

        const session= await Session.findById(id);

        if(!session){
            return res.status(400).json({
                message:"session Not Found",
            })
        }

        if(session.host.toString()!==userId.toString()){
            return res.status(403).json({
                message:"Only Host can End the Session",
            })
        }

        if(session.status==="Completed"){
            return res.status(400).json({
                message:"Session is Already Completed",
            })
        }

        session.status="Completed";
        await session.save();

        // delete stream session 

        const call=streamClient.video.call("default", session.callId);
        await call.delete({hard:true});

        // delete chat channel 
        const channel=chatClient.channel("message", session.callId);
        await channel.delete({hard:true});

    } catch (error) {
        console.log("Error Ending Session", error);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
}

const allFunctions = [createSession, getActiveSession, getMyRecentSession, getSessionById, joinSession, endSession]

export default allFunctions
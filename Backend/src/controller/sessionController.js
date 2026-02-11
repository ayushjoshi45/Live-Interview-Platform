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
    return res.status(200).json({
        message: "this is from session controller",
    })
}
export async function joinSession(req, res) {
    return res.status(200).json({
        message: "this is from session controller",
    })
}
export async function endSession(req, res) {
    return res.status(200).json({
        message: "this is from session controller",
    })
}

const allFunctions = [createSession, getActiveSession, getMyRecentSession, getSessionById, joinSession, endSession]

export default allFunctions
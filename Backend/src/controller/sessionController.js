import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";
export async function createSession(req, res) {
    try {
        const { problem, difficulty } = req.body || {};
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if (!problem || !difficulty) {
            return res.status(400).json({ message: "Problem and Difficulty are Required" });
        }

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        let session = null;
        let call = null;
        let channel = null;

        session = await Session.create({
            problem,
            difficulty,
            host: userId,
            callId,
        });

        call = streamClient.video.call("default", callId);
        await call.getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: { problem, difficulty, sessionId: session._id.toString() },
            }
        });
        channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId]
        });
        await channel.create();
        return res.status(200).json({
            message: "Session Created Successfully",
            session: session,
        });
    } catch (error) {
        try {
            if (typeof channel?.delete === "function") await channel.delete({ hard: true });
            if (typeof call?.delete === "function") await call.delete({ hard: true });
            if (session?._id) await Session.findByIdAndDelete(session._id);
        } catch (cleanupError) {
            console.log("Error cleaning up failed session", cleanupError);
        }
        console.log("Error Creating session", error);
        return res.status(500).json({ message: "Failed to Create Session" });
    }
}
export async function getActiveSession(req, res) {
    try {
        const sessions = await Session.find({ status: "Active" })
            .populate("host", "name email profileImage clerkId")
            .sort({ createdAt: -1 })
            .limit(20);

        return res.status(200).json({
            message: "Sessions fetched successfully",
            sessions,
        });
    } catch (error) {
        console.log("Error in Getting Session", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}
export async function getMyRecentSession(req, res) {
    try {
        const userId = req.user._id;

        const sessions = await Session.find({
            status: "Completed",
            $or: [{ host: userId }, { participant: userId }],
        }).sort({ createdAt: -1 }).limit(20);

        return res.status(200).json({
            message: "Recent sessions fetched successfully",
            sessions,
        });
    } catch (error) {
        console.log("Error in fetching past session", error);
        return res.status(500).json({ message: "Internal server Error" });
    }
}
export async function getSessionById(req, res) {
    try {
        const { id } = req.params;

        const session = await Session.findById(id)
            .populate("host", "name email profileImage clerkId")
            .populate("participant", "name email profileImage clerkId");

        if (!session) {
            return res.status(404).json({ message: "Session Not Found" });
        }

        return res.status(200).json({
            message: "Session Fetch Successfully",
            session,
        });
    } catch (error) {
        console.log("Error Fetching Session By Id", error);
        return res.status(500).json({ message: "Internal server Error" });
    }
}
export async function joinSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;
        const session = await Session.findById(id);

        if (!session) {
            return res.status(404).json({ message: "Session Not Found" });
        }

        if (session.status === "Completed") {
            return res.status(400).json({ message: "Session is Already Completed" });
        }

        if (session.host?.toString() === userId.toString()) {
            return res.status(200).json({
                message: "Host is already in the session",
                session,
            });
        }

        if (session.participant) {
            if (session.participant.toString() === userId.toString()) {
                return res.status(200).json({
                    message: "Already joined session",
                    session,
                });
            }

            return res.status(409).json({ message: "Session is Full" });
        }

        session.participant = userId;
        await session.save();

        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);
        return res.status(200).json({
            message: "Joined Session Successfully",
            session,
        });

    } catch (error) {
        console.log("Error Joining Session", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function endSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const session = await Session.findById(id);

        if (!session) {
            return res.status(400).json({
                message: "session Not Found",
            });
        }

        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "Only Host can End the Session",
            });
        }

        if (session.status === "Completed") {
            return res.status(400).json({
                message: "Session is Already Completed",
            });
        }

        session.status = "Completed";
        await session.save();

        // delete stream session 

        const call = streamClient.video.call("default", session.callId);
        await call.delete({ hard: true });

        // delete chat channel 
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete({ hard: true });

        return res.status(200).json({
            message: "Session ended successfully",
            session,
        });

    } catch (error) {
        console.log("Error Ending Session", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

const allFunctions = [createSession, getActiveSession, getMyRecentSession, getSessionById, joinSession, endSession]

export default allFunctions
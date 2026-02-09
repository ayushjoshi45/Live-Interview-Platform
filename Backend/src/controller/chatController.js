import { chatClient } from "../lib/stream.js";

export async function generateStreamToken(req,res){

    try {
        const token=chatClient.createToken(req.user.clerkId);
        return res.status(200).json({
            token,
            userId:req.user.clerkId,
            userName:req.user.name,
            userImage:req.user.image
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server Error"
        })
    }
}
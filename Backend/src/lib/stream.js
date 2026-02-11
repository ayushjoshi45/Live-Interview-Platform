import {StreamChat} from "stream-chat"
import {StreamClient} from "@stream-io/node-sdk"
import ENV from "./env.js"

const apiKey=ENV.STREAM_API_KEY;
const apiSecret=ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    throw new Error("Stream API key and secret must be defined in environment variables");
}

export const streamClient=new StreamClient(apiKey,apiSecret)
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const insertUserToStream = async (userData)=>{
    try {
        await chatClient.upsertUser([userData]);
        console.log("user inserted to stream successfully");
    } catch (error) {
        console.log("❌ Error inserting user to Stream", error);
    }
}
export const deleteUserFromStream = async (userId)=>{
    try {
        await chatClient.deleteUser(userId);
        console.log("user deleted from stream successfully");
    } catch (error) {
        console.log("❌ Error deleting user from Stream", error);
    }
}

// todo: add another method to generateToken
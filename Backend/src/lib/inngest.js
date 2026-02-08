import {Inngest} from "inngest";
import { connectDb } from "./db.js";
import User from "../models/User.js";
import { deleteUserFromStream, insertUserToStream } from "./stream.js";

export const inngest = new Inngest({ id: "LIVE_INTERVIEW" });

const syncUser=inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async ({event})=>{
        try {
            await connectDb();
            const {id, email_addresses, first_name, last_name, image_url}=event.data;

            const newUser=new User({
                clerkId:id,
                email:email_addresses[0]?.email_address,
                name:`${first_name || ""} ${last_name || ""}`,
                profileImage:image_url,
            })
            await User.create(newUser);
            await insertUserToStream({
                id:newUser.clerkId.toString(),
                name:newUser.name,
                image:newUser.profileImage,
            })
        } catch (error) {
            console.log("❌ Error connecting to database", error);
            return;
        }
    }
)

const deleteUserFromDb=inngest.createFunction(
    {id:"delete-user"},
    {event:"clerk/user.deleted"},
    async ({event})=>{
        try {
            await connectDb();
            const {id}=event.data;
            await User.deleteOne({clerkId:id});
            await deleteUserFromStream(id.toString());
        } catch (error) {
            console.log("❌ Error connecting to database", error);
            return;
        }
    }
)


export const functions=[syncUser, deleteUserFromDb];
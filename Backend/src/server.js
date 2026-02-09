import express from 'express';
import ENV from './lib/env.js';
import path from 'path';
import cors from 'cors';
import { connectDb } from './lib/db.js';
import { functions, inngest } from './lib/inngest.js';
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from './middleware/protectRoute.js';
import chatRouter from "./routes/chatRoutes.js"

const app = express();
const __dirname = path.resolve();


const corsOptions={
    origin: ENV.NODE_ENV === "production" 
        ? ENV.CLIENT_URL 
        : "http://localhost:5173",
    credentials: true,
}
//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(clerkMiddleware());

app.use("/api/chat", chatRouter)
app.get("/health", (req, res) => {
    res.status(200).json({ message: "This is the response from backend" });
})


app.get("/video-call", protectRoute, (req,res)=>{
    return res.status(200).json({message:"This is the Protected Route"});
})

app.use("/api/inngest", serve({client:inngest, functions}));




if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    // Catch-all: serve frontend for non-API routes (SPA client-side routing)
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

const startServer = async () => {
    try {
        if(!ENV.DATABASE_URI){
            throw new Error("DATABASE_URI is not defined in enviroment variables");
        }
        await connectDb();
        app.listen(ENV.PORT, () => {
            console.log(`Server Running on port ${ENV.PORT}`);
        })
    } catch (error) {
        console.log("❌ Error starting server", error);
    }
}

startServer();
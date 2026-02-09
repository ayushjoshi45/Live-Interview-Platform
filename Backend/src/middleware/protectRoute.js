import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'
import User from '../models/User.js'

export const protectRoute=[
    requireAuth({signInUrl:"/sign-in"}),

    async(req,res,next)=>{
        try {
            const clerkId=req.auth().userId;
            if(!clerkId) return res.status(401).json({message:"user not Authorized"});

            const user=await User.findOne({clerkId})
            if(!user) return res.status(404).json({message:"user not found in DB"});

            req.user=user;
            next();
        } catch (error) {
            console.log("error in protected Route", error);
            return res.status(500).json({message:"Internal server Error"});
        }
    }
]
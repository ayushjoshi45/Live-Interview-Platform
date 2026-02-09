import express from "express"
import { generateStreamToken } from "../controller/chatController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router=express.Router();

router.get("/chatRoutes",protectRoute, (req,res)=>{
    return res.status(200).json({message:"This route is working fine"});
})
router.get("/token",protectRoute, generateStreamToken)

export default router
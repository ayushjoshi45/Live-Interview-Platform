import express from "express"
import { createSession, endSession, getActiveSession, getMyRecentSession, getSessionById, joinSession } from "../controller/sessionController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router=express.Router();

router.post("/", protectRoute, createSession)
router.get("/active", protectRoute, getActiveSession)
router.get("/my-recent", protectRoute, getMyRecentSession)
router.get("/:id", protectRoute, getSessionById)
router.post("/:id/join", protectRoute, joinSession)
router.post("/:id/end", protectRoute, endSession)
export default router
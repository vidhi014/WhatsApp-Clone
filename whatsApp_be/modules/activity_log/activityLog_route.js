import express from "express";
import { getRecentActivities } from "./activityLog_controller.js";
import authMiddleware from "../../middlewares/auth.js";

const route = express.Router();
route.get("/", authMiddleware, getRecentActivities);
export default route;

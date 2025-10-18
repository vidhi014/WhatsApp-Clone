import express from "express";
import { getAllMessages, getMessageById, createMessage, updateMessageStatus, deleteMessage } from "./message_controller.js";
import messageValidationRules from "./messageValidator.js";
import authMiddleware from "../../middlewares/auth.js";

const route = express.Router();

route.get("/", authMiddleware, getAllMessages);
route.get("/:message_id", authMiddleware, getMessageById);
route.post("/", authMiddleware, messageValidationRules.create, createMessage);
route.put("/:message_id/status", authMiddleware, messageValidationRules.updateStatus, updateMessageStatus);
route.delete("/:message_id", authMiddleware, messageValidationRules.delete, deleteMessage);

export default route;

import messages  from "../../common/message.js";
import statusCodes from "../../common/statusCode.js";
import { validationResult } from "express-validator";
import { handleBotResponse, logActivity } from "../../common/helpers.js";
import { persistMessage } from "../../common/helpers.js";
import Message from "./message.js" 

const validateRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(statusCodes.bad_request).json({ errors: errors.array() });
};

export const getAllMessages = async (req, res) => {
  try {
    const filter = {};
    if (req.query.sender) filter.sender = req.query.sender;
    if (req.query.recipient) filter.recipient = req.query.recipient;

    const limit = parseInt(req.query.limit) || 100;
    const skip = parseInt(req.query.skip) || 0;

    const list = await Message.find(filter).sort({ timestamp: -1 }).skip(skip).limit(limit);
    res.status(statusCodes.success).json(list);
  } catch (err) {
    res.status(statusCodes.internal_server_error).json({ message: messages.dbError, error: err.message });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const msg = await Message.findOne({ message_id: req.params.message_id });
    if (!msg) return res.status(statusCodes.not_found).json({ message: messages.notFound });
    res.status(statusCodes.success).json(msg);
  } catch (err) {
    res.status(statusCodes.internal_server_error).json({ message: messages.dbError, error: err.message });
  }
};

export const createMessage = async (req, res) => {
  validateRequest(req, res);
  try {
    const { sender, recipient, content } = req.body;
    const newMsg = await Message.create({ sender, recipient, content, status: "Sent", is_bot_response: false });
    await logActivity("MessageSent", { message_id: newMsg.message_id, sender, recipient });

    if (recipient === "whatsease_bot") {
      const botOutcome = handleBotResponse(content, [content]);
      const botMsg = await Message.create({ sender: "whatsease_bot", recipient: sender, content: botOutcome.reply, status: "Delivered", is_bot_response: true });
      await logActivity("BotReplied", { bot_message_id: botMsg.message_id, to: sender });
      return res.status(statusCodes.created).json({ userMessage: newMsg, botReply: botMsg });
    }
    return res.status(statusCodes.created).json(newMsg);
  } catch (err) {
    console.error("🔥 Error in createMessage:", err);
    return res.status(statusCodes.internal_server_error).json({
      message: messages?.internalServerError || "Internal Server Error",
      error: err.message
    });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    const { message_id } = req.params;
    const { status } = req.body;
    const updated = await Message.findOneAndUpdate({ message_id }, { status }, { new: true });
    if (!updated) return res.status(statusCodes.not_found).json({ message: messages.notFound });
    await logActivity("MessageStatusUpdated", { message_id, status });
    res.status(statusCodes.success).json(updated);
  } catch (err) {
    res.status(statusCodes.internal_server_error).json({ message: messages.dbError, error: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { message_id } = req.params;
    const deleted = await Message.findOneAndDelete({ message_id });
    if (!deleted) return res.status(statusCodes.not_found).json({ message: messages.notFound });
    await logActivity("MessageDeleted", { message_id });
    res.status(statusCodes.success).json({ message: messages.deleted });
  } catch (err) {
    res.status(statusCodes.internal_server_error).json({ message: messages.dbError, error: err.message });
  }
};

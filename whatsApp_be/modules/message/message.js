import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const messageSchema = new mongoose.Schema({
  message_id: { type: String, default: uuidv4, unique: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["Sent", "Delivered", "Read"], default: "Sent" },
  is_bot_response: { type: Boolean, default: false },
  context: { type: Array, default: [] } 
});

const Message = mongoose.model("Message", messageSchema);
export default Message;

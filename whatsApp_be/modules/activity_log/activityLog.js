import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g. MessageSent, BotReplied, MessageRead
  meta: { type: Object, default: {} },
  timestamp: { type: Date, default: Date.now }
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;

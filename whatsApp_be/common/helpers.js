import functions from './functions.js';
import messages from './message.js';
import statusCodes from './statusCode.js'

const helpers = {
  functions,
  messages,
  statusCodes
};

export const handleBotResponse = (userMessage, context = []) => {
  const msg = (userMessage || "").toLowerCase();

  // simple intent detection
  if (msg.includes("hi") || msg.includes("hello")) {
    return { reply: "Hello 👋! I’m Whatsease — how can I help you today?", retainContext: true };
  }
  if (msg.includes("help")) {
    return { reply: "You can ask me about messages, users, or say 'bye' to end chat.", retainContext: true };
  }
  if (msg.includes("who are you") || msg.includes("what is whatsease")) {
    return { reply: "I am Whatsease — your friendly chat assistant built into this app.", retainContext: false };
  }
  if (msg.includes("bye") || msg.includes("goodbye")) {
    return { reply: "Goodbye 👋! If you need more help later, just message me.", retainContext: false };
  }

  // if previous context exists, try to provide contextual reply
  if (context.length && context[context.length - 1].includes("order")) {
    return { reply: "About your order: please share your order id and I will check it.", retainContext: true };
  }

  // fallback
  return { reply: "I'm learning new things every day 🤖. Could you rephrase that?", retainContext: true };
};

/**
 * Log activity into Activity collection (async).
 * activityType: string (UserMessage, BotReply, MessageDelivered, MessageRead, UserLogin, etc)
 * meta: object
 */
export const logActivity = async (activityType, meta = {}) => {
  try {
    await Activity.create({
      type: activityType,
      meta,
      timestamp: new Date()
    });
  } catch (err) {
    // Logging should not block main flow
    console.error("Activity logging failed", err);
  }
};

/**
 * Utility to persist a message (and optionally log)
 */
export const persistMessage = async (payload) => {
  // payload: { message_id, sender, recipient, content, timestamp, status, is_bot_response }
  const msg = await Message.create(payload);
  await logActivity("MessageSaved", { message_id: msg.message_id, sender: msg.sender, recipient: msg.recipient });
  return msg;
};

export default helpers;
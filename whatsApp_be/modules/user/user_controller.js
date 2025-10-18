import User from "./user.js";
import messages from "../../common/message.js";
import statusCodes from "../../common/statusCode.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { logActivity } from "../../common/helpers.js";

dotenv.config();

const validateRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(statusCodes.bad_request).json({ errors: errors.array() });
  }
};

export const registerController = async (req, res) => {
  validateRequest(req, res);
  try {
    const { email, password, name } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(statusCodes.bad_request).json({ message: messages.userExists });

    const user = await User.create({ email, password, name });
    await logActivity("UserRegistered", { user_id: user.user_id, email: user.email });

    res.status(statusCodes.created).json({ user_id: user.user_id, email: user.email, name: user.name });
  } catch (err) {
    res.status(statusCodes.internal_server_error).json({ message: messages.internalServerError, error: err.message });
  }
};

export const loginController = async (req, res) => {
  validateRequest(req, res);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(statusCodes.unauthorized).json({ message: messages.invalidCredentials });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(statusCodes.unauthorized).json({ message: messages.invalidCredentials });

    const payload = { user_id: user.user_id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    await logActivity("UserLogin", { user_id: user.user_id, email: user.email });
    res.status(statusCodes.success).json({ token, user: { user_id: user.user_id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(statusCodes.internal_server_error).json({ message: messages.internalServerError, error: err.message });
  }
};

export const getUserController = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id }).select("-password -_id -__v");
    if (!user) return res.status(statusCodes.not_found).json({ message: messages.notFound });
    res.status(statusCodes.success).json(user);
  } catch (err) {
    res.status(statusCodes.internal_server_error).json({ message: messages.dbError, error: err.message });
  }
};

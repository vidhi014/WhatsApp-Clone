import express from "express";
import { registerController, loginController, getUserController } from "./user_controller.js";
import userValidation from "./userValidator.js";
import authMiddleware from "../../middlewares/auth.js";

const route = express.Router();

route.post("/register", userValidation.register, registerController);
route.post("/login", userValidation.login, loginController);
route.get("/:user_id", authMiddleware, getUserController);

export default route;

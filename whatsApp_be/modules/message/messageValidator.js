import { body, param } from "express-validator";

const messageValidationRules = {
  create: [
    body("sender").notEmpty().withMessage("Sender required"),
    body("recipient").notEmpty().withMessage("Recipient required"),
    body("content").notEmpty().withMessage("Content required")
  ],
  updateStatus: [
    param("message_id").notEmpty().withMessage("Message ID required"),
    body("status").isIn(["Sent", "Delivered", "Read"]).withMessage("Invalid status")
  ],
  delete: [param("message_id").notEmpty().withMessage("Message ID required")]
};

export default messageValidationRules;

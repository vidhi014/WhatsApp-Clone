import { body, param } from "express-validator";

const userValidation = {
  register: [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min length 6")
  ],
  login: [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required")
  ],
  getById: [param("user_id").notEmpty().withMessage("user_id required")]
};

export default userValidation;

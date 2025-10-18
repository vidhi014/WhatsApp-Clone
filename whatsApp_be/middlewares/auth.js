import jwt from "jsonwebtoken";
import statusCodes from "../common/statusCode.js";
import messages from "../common/message.js";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // No token = Unauthorized
    return res.status(statusCodes.unauthorized).json({ message: "Authentication token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Example: check if user is allowed to access route
    if (!decoded.user_id) {
      return res.status(statusCodes.forbidden).json({ message: "Forbidden: You do not have access" });
    }

    next();
  } catch (err) {
    // Invalid token = Unauthorized
    return res.status(statusCodes.unauthorized).json({ message: "Invalid token", error: err.message });
  }
};

export default authMiddleware;


// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import statusCodes from "../common/statusCode.js";
// import messages from "../common/message.js";

// dotenv.config();

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(statusCodes.unauthorized).json({ message: messages.authFailed });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { user_id, email }
//     next();
//   } catch (err) {
//     return res.status(statusCodes.unauthorized).json({ message: messages.authFailed, error: err.message });
//   }
// };

// export default authMiddleware;


import Activity from "./activityLog.js";
import statusCodes from "../../common/statusCode.js";

export const getRecentActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const activities = await Activity.find().sort({ timestamp: -1 }).limit(limit);
    res.status(statusCodes.success).json(activities);
  } catch (err) {
    res.status(statusCodes.internal_server_error).json({ error: err.message });
  }
};

const Activity = require("../models/Activity");

const createActivities = async (req, res) => {
  try {
    const { activities } = req.body;

    if (!Array.isArray(activities) || activities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "activities must be a non-empty array"
      });
    }

    const savedActivities = await Activity.insertMany(activities);

    res.status(201).json({
      success: true,
      count: savedActivities.length,
      data: savedActivities
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createActivities
};
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

    const processedActivities = [];

    for (const activity of activities) {
      if (activity.interactionType === "CONTENT_OPEN") {
        const currentSessionOpen = await Activity.findOne({
          userId: activity.userId,
          topicId: activity.topicId,
          resourceId: activity.resourceId,
          sessionId: activity.sessionId,
          interactionType: {
            $in: ["CONTENT_OPEN", "CONTENT_REVISIT"]
          }
        });

        if (currentSessionOpen) {
          continue;
        }

        const previousOpen = await Activity.findOne({
          userId: activity.userId,
          topicId: activity.topicId,
          resourceId: activity.resourceId,
          interactionType: {
            $in: ["CONTENT_OPEN", "CONTENT_REVISIT"]
          },
          sessionId: {
            $ne: activity.sessionId
          }
        });

        if (previousOpen) {
          activity.interactionType = "CONTENT_REVISIT";
        }
      }

      processedActivities.push(activity);
    }

    const savedActivities = await Activity.insertMany(
      processedActivities
    );

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

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ timestamp: -1 })
      .populate("userId", "name email")
      .populate("topicId", "name")
      .populate("resourceId", "title type difficulty");

    res.json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(
      req.params.activityId
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found"
      });
    }

    res.json({
      success: true,
      message: "Activity deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteAllActivities = async (req, res) => {
  try {
    const result = await Activity.deleteMany({});

    res.json({
      success: true,
      message: "All activities deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createActivities,
  getActivities,
  deleteActivity,
  deleteAllActivities
};
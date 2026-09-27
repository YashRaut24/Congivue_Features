const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true
    },
    sessionId: {
      type: String,
      required: true
    },
    interactionType: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    duration: {
      type: Number,
      default: 0
    },
    completionRatio: {
      type: Number,
      default: 0,
      min: 0,
      max: 1
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Activity", activitySchema);
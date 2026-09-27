const crypto = require("crypto");

const LearningSession = require("../models/LearningSession");

const startSession = async (req, res) => {
  try {
    const { userId, topicId } = req.body;

    if (!userId || !topicId) {
      return res.status(400).json({
        success: false,
        message: "userId and topicId are required"
      });
    }

    const sessionId = `session-${crypto.randomUUID()}`;

    const session = await LearningSession.create({
      userId,
      topicId,
      sessionId,
      startTime: new Date()
    });

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const endSession = async (req, res) => {
  try {
    const session = await LearningSession.findOne({
      sessionId: req.params.sessionId
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Learning session not found"
      });
    }

    if (session.endTime) {
      return res.status(409).json({
        success: false,
        message: "Learning session has already ended"
      });
    }

    const endTime = new Date();

    const duration = Math.max(
      0,
      Math.floor((endTime - session.startTime) / 1000)
    );

    session.endTime = endTime;
    session.duration = duration;

    await session.save();

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  startSession,
  endSession
};
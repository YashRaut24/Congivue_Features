const Topic = require("../models/Topic");

const createTopic = async (req, res) => {
  try {
    const topic = await Topic.create(req.body);

    res.status(201).json({
      success: true,
      data: topic
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createTopic,
  getTopics
};
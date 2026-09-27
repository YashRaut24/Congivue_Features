const Resource = require("../models/Resource");

const createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getResourcesByTopic = async (req, res) => {
  try {
    const resources = await Resource.find({
      topicId: req.params.topicId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createResource,
  getResourcesByTopic
};
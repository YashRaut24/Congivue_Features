const express = require("express");

const {
  createResource,
  getResourcesByTopic
} = require("../controllers/resourceController");

const router = express.Router();

router.post("/", createResource);
router.get("/topic/:topicId", getResourcesByTopic);

module.exports = router;
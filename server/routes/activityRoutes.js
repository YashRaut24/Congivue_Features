const express = require("express");

const {
  createActivities
} = require("../controllers/activityController");

const router = express.Router();

router.post("/batch", createActivities);

module.exports = router;
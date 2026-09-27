const express = require("express");

const {
  createActivities,
  getActivities,
  deleteActivity,
  deleteAllActivities
} = require("../controllers/activityController");

const router = express.Router();

router.post("/batch", createActivities);
router.get("/", getActivities);
router.delete("/all", deleteAllActivities);
router.delete("/:activityId", deleteActivity);

module.exports = router;
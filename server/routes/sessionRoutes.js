const express = require("express");

const {
  startSession,
  endSession
} = require("../controllers/sessionController");

const router = express.Router();

router.post("/start", startSession);
router.post("/:sessionId/end", endSession);

module.exports = router;
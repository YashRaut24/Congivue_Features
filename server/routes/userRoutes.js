const express = require("express");

const {
  createUser,
  getUser
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/:userId", getUser);

module.exports = router;
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/authController");
const { strictLimiter } = require("../middleware/RateLimiter");
router.post("/register", strictLimiter, registerUser);
router.post("/login", strictLimiter, loginUser);

module.exports = router;
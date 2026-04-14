const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { detectDisease } = require("../controller/detectDiseaseController");
const authMiddleware = require("../middleware/authMiddleware");
const { mediumLimiter } = require("../middleware/RateLimiter");
router.post("/detect-disease", authMiddleware, mediumLimiter, upload.array("images", 4), detectDisease);

module.exports = router;
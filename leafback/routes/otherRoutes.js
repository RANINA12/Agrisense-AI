const express = require("express");
const router = express.Router();
const { SubmitFeedback } = require("../controller/FeedbackController");
const { UpdateFeedback } = require("../controller/FeedbackController");
const { GetAllFeedback } = require("../controller/FeedbackController");
const { ShowHistory } = require("../controller/ShowHistroy");
const { ShowDetailedHistory } = require("../controller/ShowHistroy");
const { HelpQueryController } = require("../controller/HelpQueryControl");
const authMiddleware = require("../middleware/authMiddleware");
const { strictLimiter, mediumLimiter, lowLimiter } = require("../middleware/RateLimiter");

router.post("/feedback", authMiddleware, lowLimiter, SubmitFeedback);
router.patch("/feedback/:scanId", authMiddleware, UpdateFeedback);
router.get("/feedback", authMiddleware, lowLimiter, GetAllFeedback);
router.get("/getAllScans", authMiddleware, lowLimiter, ShowHistory);
router.get("/scan/:scan_id", authMiddleware, mediumLimiter, ShowDetailedHistory);
router.post("/query/help", strictLimiter, HelpQueryController);

module.exports = router;
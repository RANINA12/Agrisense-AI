const express = require("express");
const router = express.Router();
const { SubmitFeedback } = require("../controller/FeedbackController");
const { UpdateFeedback } = require("../controller/FeedbackController");
const { GetAllFeedback } = require("../controller/FeedbackController");
const { ShowHistory } = require("../controller/ShowHistroy");
const { ShowDetailedHistory } = require("../controller/ShowHistroy");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/feedback", authMiddleware, SubmitFeedback);
router.patch("/feedback/:scanId", authMiddleware, UpdateFeedback);
router.get("/feedback", authMiddleware, GetAllFeedback);
router.get("/getAllScans", authMiddleware, ShowHistory);
router.get("/scan/:scan_id", authMiddleware, ShowDetailedHistory);

module.exports = router;
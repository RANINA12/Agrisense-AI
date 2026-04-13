const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { detectDisease } = require("../controller/detectDiseaseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/detect-disease", authMiddleware, upload.array("images", 4), detectDisease);

module.exports = router;
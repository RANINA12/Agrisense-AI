
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

router.get("/admin-dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
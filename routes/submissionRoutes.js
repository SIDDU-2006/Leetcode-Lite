const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  submitCode,
  getMySubmissions
} = require("../controllers/submissionController");

router.post("/", protect, submitCode);
router.get("/my", protect, getMySubmissions);
router.post("/run", protect, runCode);

module.exports = router;

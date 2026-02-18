const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const express = require("express");
const router = express.Router();

module.exports = router;


const { 
  createProblem, 
  getAllProblems, 
  getProblemById 
} = require("../controllers/problemController");

router.post("/", protect, adminOnly, createProblem);
router.get("/", getAllProblems);
router.get("/:id", getProblemById);

const express = require("express");
const router = express.Router();

module.exports = router;


const { 
  createProblem, 
  getAllProblems, 
  getProblemById 
} = require("../controllers/problemController");

router.post("/", createProblem);
router.get("/", getAllProblems);
router.get("/:id", getProblemById);

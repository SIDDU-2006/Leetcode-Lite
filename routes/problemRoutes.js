const express = require("express");
const router = express.Router();

module.exports = router;

//
const { createProblem, getAllProblems } = require("../controllers/problemController");

router.post("/", createProblem);
router.get("/", getAllProblems);

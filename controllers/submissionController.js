const { executeJava, executeJS } = require("../services/executionService");
const Problem = require("../models/Problem");
const Submission = require("../models/Submission");

// ============================
// SUBMIT CODE
// ============================
exports.submitCode = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    let finalStatus = "Accepted";
    let totalTime = 0;

    for (let testCase of problem.testCases) {
      let result;

      if (language === "java") {
        result = await executeJava(code, testCase.input);
      } else if (language === "javascript") {
        result = await executeJS(code, testCase.input);
      } else {
        return res.status(400).json({ message: "Unsupported language" });
      }

      totalTime += result.executionTime || 0;

      if (result.error) {
        finalStatus = "Runtime Error";
        break;
      }

      if (result.output.trim() !== testCase.output.trim()) {
        finalStatus = "Wrong Answer";
        break;
      }
    }

    const submission = await Submission.create({
      user: req.user.id,
      problem: problemId,
      code,
      language,
      status: finalStatus,
      executionTime: totalTime
    });

    res.status(201).json({
      message: "Submission evaluated",
      submission
    });

  } catch (error) {
    res.status(500).json({
      message: "Execution failed",
      error: error.message
    });
  }
};

// ============================
// GET MY SUBMISSIONS
// ============================
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user.id })
      .populate("problem", "title difficulty")
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};

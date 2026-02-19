const Submission = require("../models/Submission");
const Problem = require("../models/Problem");

// SUBMIT CODE
exports.submitCode = async (req, res) => {

    try {

        const { problemId, code, language } = req.body;

        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        // ⚠️ For now we simulate result
        let status = "Accepted";

        // Create submission
        const submission = await Submission.create({
            user: req.user.id,
            problem: problemId,
            code,
            language,
            status
        });

        res.status(201).json({
            message: "Submission successful",
            submission
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });
    }
};

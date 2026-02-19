const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
    input: String,
    expectedOutput: String
});

const problemSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Easy"
    },

    examples: [
        {
            input: String,
            output: String,
            explanation: String
        }
    ],

    constraints: [String],

    starterCode: {
        type: String
    },

    testCases: [
  {
    input: String,
    output: String
  }
]


}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);

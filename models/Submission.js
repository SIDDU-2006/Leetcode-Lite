const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true
    },

    code: {
        type: String,
        required: true
    },

    language: {
        type: String,
        default: "javascript"
    },

    status: {
        type: String,
        enum: ["Accepted", "Wrong Answer", "Pending"],
        default: "Pending"
    },
    
    executionTime: {
  type: Number
}


}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);

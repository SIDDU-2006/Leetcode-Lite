const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/leetcode-lite");

        console.log("MongoDB Connected 🚀");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;

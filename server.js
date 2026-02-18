require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//temp
const protect = require("./middleware/authMiddleware");

app.get("/protected", protect, (req, res) => {
    res.json({
        message: "You accessed a protected route!",
        userId: req.user
    });
});

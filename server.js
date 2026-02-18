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




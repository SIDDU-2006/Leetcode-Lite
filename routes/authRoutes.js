const express = require("express");
const router = express.Router();

//added after creating Login
module.exports = router;

const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

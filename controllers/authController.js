const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER USER
exports.registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
    message: "User registered successfully",
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
    });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

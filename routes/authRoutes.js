const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

// Add a new user
router.post("/register", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        username = username ? username.replace(/(<([^>]+)>)/ig, '') : ''; // Sanera användarnamnet
        email = email ? email.replace(/(<([^>]+)>)/ig, '') : ''; // Sanera e-postadressen
        password = password ? password.replace(/(<([^>]+)>)/ig, '') : ''; // Sanera lösenordet 

        if (!/@hamburgare\.se$/.test(sanitizedEmail)) {
            const Feedback = document.getElementById('Feedback');
            Feedback.textContent = 'E-postadressen måste ha domänen @hamburgare.se';
            return;
        }

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Invalid input, send username, email and password" });
        }
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error("Error creating user:", error); // Logga felet
        res.status(500).json({ error: "Server error" });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Incorrect username/password!" });
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Incorrect username/password!" });
        }
        const payload = { username: username, userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "User logged in!", token: token });
    } catch (error) {
        console.error("Error logging in:", error); // Logga felet
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/validate", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

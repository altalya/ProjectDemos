const express = require('express');
const authRoutes = express.Router();
const User = require('../models/user.model');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = "token";

authRoutes.post('/login',async (req, res) => {
    const { name, password } = req.body;
    console.log("authentication",name);
    const user = await User.findOne({ name: { $eq: name } });
    console.log("user",user);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    if (password === user.password) {
        let token = jwt.sign({ name }, SECRET, { expiresIn: '1h' });
        
        return res.json({ token: token ,userId: user._id});
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

authRoutes.post('/register', async (req, res) => {
    const { name, password } = req.body;

    if (name && password) {
        const newUser = new User({ name, password });
        await newUser.save();
        console.log("User registered:", newUser);
        return res.status(201).json({ message: 'User registered successfully' });
    }
    res.status(400).json({ message: 'Please provide username and password' });
});

module.exports = authRoutes;
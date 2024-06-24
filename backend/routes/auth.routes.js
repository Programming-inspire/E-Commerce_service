const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateToken} = require('../utils/jwt');
const verifyToken = require('../middlewares/auth');

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate JWT token
        const token = generateToken({ userId: user._id });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error('Error in signup:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Login route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken({ userId: user._id });

        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (err) {
        console.error('Error in login:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});


// Protected route
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;

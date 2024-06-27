const express = require('express');
const bodyParser = require('body-parser');
const { registerUser, authenticateUser } = require('../models/user');

const router = express.Router();

router.use(bodyParser.json());

// Registration endpoint
router.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    registerUser(username, password, email, (err, userId) => {
        if (err) return res.status(500).send('Error registering user');
        res.status(200).send('User registered successfully');
    });
});

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    authenticateUser(username, password, (err, user) => {
        if (err) return res.status(400).send('Invalid username or password');
        res.status(200).send('Login successful');
    });
});

module.exports = router;

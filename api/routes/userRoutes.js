const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, course } = req.body;

        const user = await User.create({ name, email, password, phone, course });

        res.json({ message: 'User saved successfully', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

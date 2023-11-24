const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler'); 


router.get('/user-data', asyncHandler(verifyToken), asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId, { password: 0 });

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
}));

module.exports = router;


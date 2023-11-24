// verifyToken.js
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;


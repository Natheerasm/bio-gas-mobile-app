// user.routes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/data',UserController.getData);

module.exports = router;

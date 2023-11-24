//device.routes.js

const express = require('express');
const router = express.Router();
const DeviceController = require('../controller/device.controller');

router.post('/addDevice', DeviceController.addDevice);

module.exports = router;

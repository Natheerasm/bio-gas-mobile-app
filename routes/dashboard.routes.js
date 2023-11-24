//folder name routes
// dashboard.routes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboard.controller');

router.get('/dashboard/data', dashboardController.getDashboardData);

module.exports = router;

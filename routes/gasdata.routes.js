// gasdata.routes.js
const express = require('express');
const router = express.Router();
const GasDataController = require('../controller/gasdata.controller');

router.get('/fetchAndSaveData', GasDataController.fetchDataAndSaveToMongoDB);
router.get('/dashboard-data', GasDataController.fetchDataAndSaveToMongoDB);

module.exports = router;

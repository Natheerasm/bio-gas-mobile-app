// gasdata.controller.js
const GasDataService = require('../services/gasdata.service');

async function fetchDataAndSaveToMongoDB(req, res, next) {
  try {
    const { deviceID } = req.body; // Use deviceID from request or another source
    const dataFromThingSpeak = await GasDataService.fetchDataFromThingSpeak(deviceID);

    if (dataFromThingSpeak && dataFromThingSpeak.length > 0) {
      await GasDataService.saveGasDataToMongoDB(dataFromThingSpeak[0], deviceID);
      res.json({ status: true, message: 'Data fetched and saved successfully.' });
    } else {
      res.status(500).json({ status: false, message: 'No data received from ThingSpeak.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

module.exports = { fetchDataAndSaveToMongoDB };

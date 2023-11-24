// gasdata.service.js

const axios = require('axios');
const mongoose = require('mongoose');
const cron = require('node-cron');
const GasData = require('../models/gasdata.model');
const DeviceModel = require('../models/device.model');

async function fetchDataFromThingSpeak(deviceID) {
  try {
    const device = await DeviceModel.findOne({ deviceID });
    if (!device) {
      throw new Error(`Device with ID ${deviceID} not found`);
    }

    const response = await axios.get(device.API);
    return response.data.feeds;
  } catch (error) {
    throw new Error(`Error fetching data from ThingSpeak API for device ${deviceID}: ${error.message}`);
  }
}

async function saveGasDataToMongoDB(data, deviceID) {
  try {
    const temperatureCelsius = parseFloat(data.field1) || 0.0;
    const temperatureFahrenheit = parseFloat(data.field2) || 0.0;
    const flowRate = parseFloat(data.field3) || 0.0;
    const gasSensorValue = parseFloat(data.field4) || 0.0;

    // Save the data to the centralized GasData collection
    await GasData.create({
      deviceID,
      temperatureCelsius,
      temperatureFahrenheit,
      flowRate,
      gasSensorValue,
    });

    console.log(`Data saved to GasData collection for device ${deviceID} at:`, new Date());
  } catch (error) {
    throw new Error(`Error saving gas data to GasData collection for device ${deviceID}: ${error.message}`);
  }
}

// Schedule to save data every 30 minutes
cron.schedule('*/30 * * * *', async () => {
  try {
    const devices = await DeviceModel.find();

    for (const device of devices) {
      try {
        const data = await fetchDataFromThingSpeak(device.deviceID);

        if (data && data.length > 0) {
          await saveGasDataToMongoDB(data[0], device.deviceID);
        } else {
          console.warn(`No data received from ThingSpeak for device ${device.deviceID}`);
        }
      } catch (error) {
        console.error(`Error processing device ${device.deviceID}: ${error.message}`);
      }
    }
  } catch (error) {
    console.error('Error fetching devices:', error.message);
  }
});

module.exports = { fetchDataFromThingSpeak, saveGasDataToMongoDB };
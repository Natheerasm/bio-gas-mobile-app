//device.controller.js

const DeviceModel = require('../models/device.model');

exports.addDevice = async (req, res, next) => {
  try {
    const { deviceID, API } = req.body;
    const newDevice = new DeviceModel({ deviceID, API });
    const savedDevice = await newDevice.save();
    res.json({ status: true, success: 'Device added successfully', device: savedDevice });
  } catch (err) {
    next(err);
  }
};
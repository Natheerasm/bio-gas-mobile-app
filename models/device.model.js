//device.model.js

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: [true, 'DeviceID is required'],
    unique: true,
  },
  API: {
    type: String,
    required: [true, 'API is required'],
  },
});

const Device = mongoose.model('devices', deviceSchema);

module.exports = Device;

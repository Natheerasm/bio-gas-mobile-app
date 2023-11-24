// gasdata.model.js
const mongoose = require('mongoose');

const gasDataSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true,
    ref: 'devices'
  },
  temperatureCelsius: Number,
  temperatureFahrenheit: Number,
  flowRate: Number,
  gasSensorValue: Number,
  createdAt: { type: Date, default: Date.now },
});

const GasData = mongoose.model('GasData', gasDataSchema);

module.exports = GasData;
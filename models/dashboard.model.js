//dashboard.model.js

const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  deviceID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'devices'
  },
  temperatureCelsius: Number,
  temperatureFahrenheit: Number,
  flowRate: Number,
  gasSensorValue: Number,
  createdAt: { type: Date, default: Date.now },
});

const DashboardModel = mongoose.model('Dashboard', dashboardSchema);

module.exports = DashboardModel;

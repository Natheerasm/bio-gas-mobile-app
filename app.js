//app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/user.routes');
const gasDataRoutes = require('./routes/gasdata.routes');
const deviceRoutes = require('./routes/device.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/', UserRoute);
app.use('/gasdata', gasDataRoutes);
app.use('/device', deviceRoutes);
app.use('/dashboard', dashboardRoutes);

module.exports = app;

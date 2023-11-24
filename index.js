//index.js
const app = require("./app");
const db = require('./config/db');
const port = 3000;

const deviceRoutes = require('./routes/device.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

app.use('/api/devices', deviceRoutes);

app.get('/', (req, res) => {
    res.send('Hello, SPM');
});

app.listen(port, () => {
    console.log(`Server Listening on Port http://localhost:${port}`);
});

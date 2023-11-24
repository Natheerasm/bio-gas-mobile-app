//db.js
const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://127.0.0.1:27017/Biogas');

connection.then((db) => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.error('MongoDB Connection error:', err);
});

module.exports = connection;

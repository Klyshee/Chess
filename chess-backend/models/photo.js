const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  image: { data: Buffer, contentType: String },
});

module.exports = mongoose.model('Photo', photoSchema);

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  fen: { type: String, required: true },
  history: { type: [String], default: [] }
});

module.exports = mongoose.model('Game', gameSchema);

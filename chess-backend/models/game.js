const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  fen: {
    type: String,
    required: true,
  },
  history: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true, // Добавляем временные метки для создания и обновления
});

module.exports = mongoose.model('Game', gameSchema);

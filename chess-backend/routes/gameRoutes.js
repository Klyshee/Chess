const express = require('express');
const Game = require('../models/game');
const router = express.Router();

router.post('/', async (req, res) => {
  const newGame = new Game({ fen: 'start', history: [] });
  await newGame.save();
  res.json(newGame);
});

router.get('/:id', async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.json(game);
});

router.put('/:id', async (req, res) => {
  const { fen, history } = req.body;
  const game = await Game.findByIdAndUpdate(req.params.id, { fen, history }, { new: true });
  res.json(game);
});

module.exports = router;

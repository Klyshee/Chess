const express = require('express');
const Game = require('../models/game');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const newGame = new Game({ fen: 'start', history: [] });
    await newGame.save();
    res.status(201).json(newGame); 
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании игры', error });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' }); 
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении игры', error });
  }
});


router.put('/:id', async (req, res) => {
  const { fen, history } = req.body;
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, { fen, history }, { new: true });
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' }); // Возвращаем статус 404, если игра не найдена
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении игры', error });
  }
});

module.exports = router;

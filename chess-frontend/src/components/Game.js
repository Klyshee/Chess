// src/components/Game.js
import React, { useEffect, useState } from 'react';
import { createGame, getGame, updateGame } from './api';

const Game = () => {
  const [gameId, setGameId] = useState(null);
  const [fen, setFen] = useState('');
  const [history, setHistory] = useState([]);

  const startNewGame = async () => {
    const newGame = await createGame();
    setGameId(newGame._id);
    setFen(newGame.fen);
    setHistory(newGame.history);
  };

  const fetchGame = async (id) => {
    const game = await getGame(id);
    setFen(game.fen);
    setHistory(game.history);
  };

  const saveGame = async () => {
    await updateGame(gameId, fen, history);
  };

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId);
    }
  }, [gameId]);

  return (
    <div>
      <h2>Игра</h2>
      <button onClick={startNewGame}>Начать новую игру</button>
      {gameId && (
        <div>
          <h3>Текущая позиция: {fen}</h3>
          <button onClick={saveGame}>Сохранить игру</button>
          <h4>История ходов:</h4>
          <ul>
            {history.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Game;

import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import axios from 'axios';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState([]);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    const createGame = async () => {
      const response = await axios.post('http://localhost:5000/api/games');
      setGameId(response.data._id);
    };
    createGame();
  }, []);

  const onDrop = async (sourceSquare, targetSquare) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // всегда промотируем в ферзя для простоты
    });

    if (move === null) return;

    setFen(game.fen());
    setHistory(game.history());

    await axios.put(`http://localhost:5000/api/games/${gameId}`, {
      fen: game.fen(),
      history: game.history()
    });
  };

  const onClear = async () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setHistory([]);

    await axios.put(`http://localhost:5000/api/games/${gameId}`, {
      fen: newGame.fen(),
      history: []
    });
  };

  return (
    <div>
      <h1>Chess on react</h1>
      <Chessboard position={fen} onDrop={onDrop} />
      <button onClick={onClear}>Сбросить игру</button>
      <h2>История ходов:</h2>
      <ul>
        {history.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChessGame;

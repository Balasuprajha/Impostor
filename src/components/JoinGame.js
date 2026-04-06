import React, { useState } from 'react';
import '../styles/JoinGame.css';

function JoinGame({ onJoinGame }) {
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameId.trim() || !playerName.trim()) {
      alert('Please enter both game ID and your name!');
      return;
    }
    setSubmitted(true);
    onJoinGame(gameId.toUpperCase(), playerName);
  };

  if (submitted) {
    return (
      <div className="joining-game">
        <p className="joining-text">Joining game {gameId.toUpperCase()}...</p>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="join-game-container">
      <div className="join-form-box">
        <h2>🚪 Join Game</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="gameId">Game ID:</label>
            <input
              id="gameId"
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Ask host for game ID"
              maxLength="10"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="playerName">Your Name:</label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              maxLength="20"
            />
          </div>

          <button type="submit" className="join-btn">
            Join Game
          </button>
        </form>

        <div className="join-info">
          <p>💡 Ask the game host for the Game ID to join their game.</p>
        </div>
      </div>
    </div>
  );
}

export default JoinGame;

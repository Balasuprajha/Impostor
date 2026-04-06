import React, { useState } from 'react';
import '../styles/PlayerLogin.css';

function PlayerLogin({ playerNumber, totalPlayers, currentPlayerName, onLogin }) {
  const [playerName, setPlayerName] = useState(currentPlayerName || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() === '') {
      alert('Please enter your name!');
      return;
    }
    onLogin(playerName.trim());
  };

  return (
    <div className="player-login">
      <div className="login-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(playerNumber / totalPlayers) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">Player {playerNumber} of {totalPlayers}</p>

        <h2>📝 Welcome Player!</h2>
        <p className="instruction">Enter your name to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Your name..."
            maxLength="20"
            autoFocus
            className="name-input"
          />
          <button type="submit" className="login-btn">
            Enter Game
          </button>
        </form>

        <div className="info-box">
          <p>Once you click "Enter Game", you will see your SECRET WORD and describe it in ONE WORD.</p>
          <p className="warning">⚠️ <strong>Keep your screen covered</strong> so others don't see your word!</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerLogin;

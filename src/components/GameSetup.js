import React, { useState } from 'react';
import '../styles/GameSetup.css';

function GameSetup({ onStartGame }) {
  const [players, setPlayers] = useState(Array(12).fill(''));

  const handlePlayerNameChange = (index, name) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const handleStartGame = () => {
    const validPlayers = players.filter(name => name.trim() !== '');
    if (validPlayers.length < 2) {
      alert('Please enter at least 2 player names!');
      return;
    }
    onStartGame(validPlayers);
  };

  return (
    <div className="game-setup">
      <div className="setup-container">
        <h2>Welcome to Word Impostor Game!</h2>
        <p className="setup-info">Enter player names (max 12). You can leave some empty if you have fewer players.</p>
        
        <div className="players-grid">
          {players.map((name, index) => (
            <div key={index} className="player-input-wrapper">
              <label>Player {index + 1}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                placeholder={`Player ${index + 1} name`}
                maxLength="20"
              />
            </div>
          ))}
        </div>

        <button className="start-button" onClick={handleStartGame}>
          Start Game
        </button>

        <div className="rules">
          <h3>Game Rules:</h3>
          <ul>
            <li>11 players get the REAL word</li>
            <li>1 player (Impostor) gets a RELATED word</li>
            <li>Each player describes their word in ONE word</li>
            <li>Team votes to find the Impostor</li>
            <li>If Team finds Impostor, Team wins!</li>
            <li>If Impostor guesses the real word, Impostor wins!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GameSetup;

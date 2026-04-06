import React, { useState } from 'react';
import '../styles/HostSetup.css';

function HostSetup({ wordPairs, onStartGame }) {
  const [numPlayers, setNumPlayers] = useState(8);
  const [selectedWordPair, setSelectedWordPair] = useState(wordPairs[0]);

  const handleStartGame = () => {
    if (numPlayers < 2) {
      alert('Please select at least 2 players!');
      return;
    }
    onStartGame(numPlayers, selectedWordPair);
  };

  const handleChangeWord = () => {
    const randomIdx = Math.floor(Math.random() * wordPairs.length);
    setSelectedWordPair(wordPairs[randomIdx]);
  };

  return (
    <div className="host-setup">
      <div className="setup-container">
        <h2>🎭 Host Setup</h2>
        
        <div className="setup-section">
          <label htmlFor="numPlayers">Number of Players:</label>
          <div className="player-selector">
            <button 
              onClick={() => setNumPlayers(Math.max(2, numPlayers - 1))}
              className="minus-btn"
            >
              −
            </button>
            <input
              id="numPlayers"
              type="number"
              min="2"
              max="12"
              value={numPlayers}
              onChange={(e) => setNumPlayers(Math.max(2, Math.min(12, parseInt(e.target.value) || 2)))}
              className="number-input"
            />
            <button 
              onClick={() => setNumPlayers(Math.min(12, numPlayers + 1))}
              className="plus-btn"
            >
              +
            </button>
          </div>
          <p className="players-info">1 Impostor + {numPlayers - 1} Team Members</p>
        </div>

        <div className="setup-section">
          <h3>Select Word Pair:</h3>
          <div className="word-display">
            <div className="real-word">
              <p className="label">Team Word:</p>
              <p className="word">{selectedWordPair.word}</p>
            </div>
            <p className="vs">VS</p>
            <div className="impostor-word">
              <p className="label">Impostor Clue:</p>
              <p className="word">{selectedWordPair.impostorWord}</p>
            </div>
          </div>
          <button className="change-word-btn" onClick={handleChangeWord}>
            🔄 Change Word Pair
          </button>
        </div>

        <button className="start-game-btn" onClick={handleStartGame}>
          Start Game
        </button>

        <div className="rules-section">
          <h3>Game Flow:</h3>
          <ol>
            <li>Each player logs in (same device, pass around)</li>
            <li>Players enter descriptions (one word each)</li>
            <li><strong>Host</strong> reveals all descriptions</li>
            <li>Players vote on who is the Impostor</li>
            <li>Winner revealed!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HostSetup;

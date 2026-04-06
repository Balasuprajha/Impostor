import React, { useState } from 'react';
import '../styles/HostSetup.css';

function HostSetup({ wordPairs, onStartGame }) {
  const [numPlayers, setNumPlayers] = useState(8);
  const [selectedWordPair, setSelectedWordPair] = useState(wordPairs[0]);
  const [hostName, setHostName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCreateGame = (e) => {
    e.preventDefault();
    if (!hostName.trim()) {
      alert('Please enter your name!');
      return;
    }
    if (numPlayers < 2) {
      alert('Please select at least 2 players!');
      return;
    }
    setSubmitted(true);
    onStartGame(numPlayers, selectedWordPair, hostName);
  };

  const handleChangeWord = () => {
    const randomIdx = Math.floor(Math.random() * wordPairs.length);
    setSelectedWordPair(wordPairs[randomIdx]);
  };

  if (submitted) {
    return (
      <div className="creating-game">
        <p className="creating-text">Creating game...</p>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="host-setup">
      <div className="setup-container">
        <h2>🎭 Create Game</h2>
        
        <form onSubmit={handleCreateGame}>
          <div className="setup-section">
            <label htmlFor="hostName">Your Name (Host):</label>
            <input
              id="hostName"
              type="text"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="Enter your name"
              maxLength="20"
              autoFocus
            />
          </div>

          <div className="setup-section">
            <label htmlFor="numPlayers">Number of Players:</label>
            <div className="player-selector">
              <button 
                type="button"
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
                type="button"
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
            <button type="button" className="change-word-btn" onClick={handleChangeWord}>
              🔄 Change Word Pair
            </button>
          </div>

          <button type="submit" className="start-game-btn">
            Create & Start Game
          </button>
        </form>

        <div className="rules-section">
          <h3>Game Flow:</h3>
          <ol>
            <li>Players join using the Game ID</li>
            <li>Once all players join, start the game</li>
            <li>Each player sees their word (real or clue) on their device</li>
            <li>Players enter descriptions in real-time</li>
            <li>Host reveals all descriptions</li>
            <li>Players vote on who is the Impostor</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HostSetup;

import React, { useState } from 'react';
import '../styles/DescriptionInput.css';

function DescriptionInput({ playerNumber, totalPlayers, playerName, isImpostor, word, onSubmit }) {
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() === '') {
      alert('Please enter a description!');
      return;
    }
    
    onSubmit(description.trim().split(/\s+/)[0]); // Only take the first word
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="description-submitted">
        <p className="submitted-message">✓ {playerName}'s description submitted!</p>
        <p className="next-message">
          Pass the device to the next player...
        </p>
      </div>
    );
  }

  return (
    <div className="description-input-page">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(playerNumber / totalPlayers) * 100}%` }}
        ></div>
      </div>
      <p className="progress-text">Player {playerNumber} of {totalPlayers}</p>

      <div className="description-container">
        <h2>{playerName}'s Turn</h2>

        <div className={`word-box ${isImpostor ? 'impostor' : 'team'}`}>
          <p className="word-label">
            {isImpostor ? '🎭 Your Clue Word (You are the Impostor!)' : 'Your Team Word'}
          </p>
          <p className="word-display">{word}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="description">Describe in ONE word:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type one word..."
            maxLength="50"
            autoFocus
            className="desc-input"
          />
          <button type="submit" className="submit-desc-btn">
            Submit & Continue
          </button>
        </form>

        <div className="desc-warning">
          ⚠️ <strong>Remember:</strong> Only describe the word given to you!
        </div>
      </div>
    </div>
  );
}

export default DescriptionInput;

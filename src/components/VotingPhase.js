import React, { useState } from 'react';
import '../styles/VotingPhase.css';

function VotingPhase({
  players,
  currentPlayerIndex,
  gameState,
  onVote,
}) {
  const [selectedVote, setSelectedVote] = useState(null);
  const [voted, setVoted] = useState(false);

  const currentPlayer = players[currentPlayerIndex];

  const handleVote = (votedPlayerName) => {
    setSelectedVote(votedPlayerName);
  };

  const handleSubmitVote = () => {
    if (selectedVote === null) {
      alert('Please select who you think is the Impostor!');
      return;
    }
    onVote(selectedVote);
    setVoted(true);
  };

  if (voted) {
    return (
      <div className="vote-submitted">
        <p className="vote-message">✓ Vote submitted!</p>
        <p className="next-message">
          {currentPlayerIndex === players.length - 1
            ? 'All votes are in. Calculating results...'
            : 'Waiting for other players to vote...'}
        </p>
      </div>
    );
  }

  return (
    <div className="voting-phase">
      <div className="voting-container">
        <h2>Voting Round</h2>
        <p className="voter-info">
          <span className="voter-name">{currentPlayer}</span>, who do you think is the Impostor?
        </p>

        <div className="game-summary">
          <h3>Descriptions Given:</h3>
          <div className="descriptions-review">
            {Object.entries(gameState.descriptions).map(([playerName, description]) => (
              <div key={playerName} className="description-review-item">
                <span className="desc-player">{playerName}:</span>
                <span className="desc-word">{description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="voting-buttons">
          <p className="vote-prompt">Click on who you think is the Impostor:</p>
          <div className="players-to-vote">
            {players.map((playerName, index) => (
              <button
                key={index}
                className={`player-vote-btn ${selectedVote === playerName ? 'selected' : ''}`}
                onClick={() => handleVote(playerName)}
              >
                {playerName}
                {selectedVote === playerName && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        <button className="submit-vote-btn" onClick={handleSubmitVote}>
          Submit Your Vote
        </button>
      </div>
    </div>
  );
}

export default VotingPhase;

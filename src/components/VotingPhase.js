import React, { useState } from 'react';
import '../styles/VotingPhase.css';

function VotingPhase({ 
  players, 
  descriptions, 
  currentPlayerIndex, 
  onVote,
  isLastVoter
}) {
  const [selectedVote, setSelectedVote] = useState(null);
  const [voted, setVoted] = useState(false);

  const currentPlayer = players[currentPlayerIndex];

  const handleVote = (votedPlayer) => {
    setSelectedVote(votedPlayer);
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
        <p className="vote-message">✓ {currentPlayer}'s vote submitted!</p>
        <p className="next-message">
          {isLastVoter ? 'All votes are in. Calculating results...' : 'Pass the device to the next player...'}
        </p>
      </div>
    );
  }

  return (
    <div className="voting-container-new">
      <div className="voting-content">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentPlayerIndex + 1) / players.length) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">Player {currentPlayerIndex + 1} of {players.length}</p>

        <h2>🗳️ Voting Round</h2>
        <p className="voter-name">{currentPlayer}, who do you think is the Impostor?</p>

        <div className="descriptions-display">
          <h3>📝 Everyone's Descriptions:</h3>
          <div className="all-descs">
            {players.map((player) => (
              <div key={player} className="desc-show">
                <span className="p-name">{player}:</span>
                <span className="p-desc">{descriptions[player]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="voting-buttons-section">
          <p className="select-prompt">Click on who you vote for:</p>
          <div className="vote-options">
            {players.map((player) => (
              <button
                key={player}
                className={`vote-option ${selectedVote === player ? 'selected' : ''}`}
                onClick={() => handleVote(player)}
              >
                {player}
                {selectedVote === player && <span className="check">✓</span>}
              </button>
            ))}
          </div>
        </div>

        <button className="submit-vote-btn" onClick={handleSubmitVote}>
          Submit Vote
        </button>
      </div>
    </div>
  );
}

export default VotingPhase;

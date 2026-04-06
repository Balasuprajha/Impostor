import React from 'react';
import '../styles/GameResults.css';

function GameResults({ players, gameState, onPlayAgain }) {

  const impostorPlayer = players[gameState.impostorIndex];
  const votes = gameState.votes;
  
  // Count votes for each player
  const voteCount = {};
  players.forEach(player => {
    voteCount[player] = 0;
  });

  Object.values(votes).forEach(votedPlayer => {
    if (votedPlayer in voteCount) {
      voteCount[votedPlayer]++;
    }
  });

  // Find who got the most votes
  const mostVotedPlayer = Object.keys(voteCount).reduce((a, b) =>
    voteCount[a] > voteCount[b] ? a : b
  );

  const wasImpostorFound = mostVotedPlayer === impostorPlayer;

  return (
    <div className="game-results">
      <div className="results-container">
        <h2 className="results-title">
          {wasImpostorFound ? '🎉 Team Wins!' : '😈 Impostor Wins!'}
        </h2>

        <div className="result-reveal">
          <div className="impostor-reveal">
            <h3>The Impostor was:</h3>
            <p className="impostor-name">{impostorPlayer}</p>
          </div>

          <div className="words-reveal">
            <div className="real-word-reveal">
              <h4>Real Word:</h4>
              <p className="revealed-word">{gameState.word}</p>
            </div>
            <div className="impostor-clue-reveal">
              <h4>Impostor's Clue:</h4>
              <p className="revealed-word">{gameState.impostorWord}</p>
            </div>
          </div>
        </div>

        <div className="voting-results">
          <h3>Voting Results:</h3>
          <div className="vote-tally">
            {players.map((player) => (
              <div key={player} className={`vote-item ${player === impostorPlayer ? 'impostor' : ''}`}>
                <span className="vote-player">{player}</span>
                <span className="vote-count">{voteCount[player]} votes</span>
                {player === mostVotedPlayer && <span className="most-voted">← Most Voted</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="descriptions-final">
          <h3>All Descriptions:</h3>
          <div className="all-descriptions">
            {Object.entries(gameState.descriptions).map(([playerName, description]) => (
              <div key={playerName} className={`final-description ${playerName === impostorPlayer ? 'impostor-desc' : ''}`}>
                <span className="final-player">{playerName}</span>
                <span className="final-desc">{description}</span>
                {playerName === impostorPlayer && <span className="impostor-badge">Impostor</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="result-message">
          {wasImpostorFound ? (
            <div className="team-win">
              <p>Great job team! You found the Impostor!</p>
            </div>
          ) : (
            <div className="impostor-win">
              <p>The Impostor fooled the team and won!</p>
            </div>
          )}
        </div>

        <button className="play-again-btn" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameResults;

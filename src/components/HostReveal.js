import React from 'react';
import '../styles/HostReveal.css';

function HostReveal({ wordPair, impostorIndex, players, descriptions, onReveal }) {
  return (
    <div className="host-reveal">
      <div className="reveal-container">
        <h2>🎭 Host Control Panel</h2>

        <div className="word-info">
          <div className="real-word-info">
            <p className="label">Team Word:</p>
            <p className="word">{wordPair.word}</p>
          </div>
          <p className="vs">VS</p>
          <div className="impostor-word-info">
            <p className="label">Impostor Clue:</p>
            <p className="word">{wordPair.impostorWord}</p>
          </div>
        </div>

        <div className="descriptions-preview">
          <h3>📝 All Descriptions:</h3>
          <div className="desc-list">
            {players.map((player, idx) => (
              <div 
                key={player} 
                className={`desc-preview ${idx === impostorIndex ? 'impostor-desc' : ''}`}
              >
                <span className="player-name">{player}</span>
                <span className="desc-word">{descriptions[player] || '(pending)'}</span>
                {idx === impostorIndex && <span className="impostor-label">← Impostor</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="host-instructions">
          <h3>🎲 Next Steps:</h3>
          <ol>
            <li>Review the descriptions above</li>
            <li>Try to guess who the Impostor is</li>
            <li>Click "Reveal to All" when ready</li>
            <li>Everyone will vote on who they think is the Impostor</li>
          </ol>
        </div>

        <button className="reveal-btn" onClick={onReveal}>
          Reveal to All Players ✨
        </button>

        <div className="reveal-warning">
          ⚠️ Once you click "Reveal", you cannot go back!
        </div>
      </div>
    </div>
  );
}

export default HostReveal;

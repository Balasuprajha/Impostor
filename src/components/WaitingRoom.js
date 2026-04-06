import React from 'react';
import '../styles/WaitingRoom.css';

function WaitingRoom({ gameData, onStartGame }) {
  return (
    <div className="waiting-room">
      <div className="waiting-container">
        <h2>👥 Waiting Room</h2>
        
        <div className="game-info">
          <div className="info-box">
            <p className="info-label">Game ID:</p>
            <p className="info-value">{gameData.gameId}</p>
            <button 
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(gameData.gameId)}
            >
              📋 Copy
            </button>
          </div>

          <div className="info-box">
            <p className="info-label">Players:</p>
            <p className="info-value">{gameData.playerCount}/{gameData.totalPlayers}</p>
          </div>
        </div>

        <div className="players-list">
          <h3>Players Joined:</h3>
          <div className="players">
            {gameData.players && gameData.players.map((player, idx) => (
              <div key={idx} className="player-badge">
                {player}
              </div>
            ))}
            {gameData.playerCount < gameData.totalPlayers && (
              Array.from({ length: gameData.totalPlayers - gameData.playerCount }).map((_, idx) => (
                <div key={`empty-${idx}`} className="player-badge empty">
                  Waiting...
                </div>
              ))
            )}
          </div>
        </div>

        {gameData.isHost && gameData.playerCount === gameData.totalPlayers ? (
          <button className="start-btn" onClick={onStartGame}>
            🎮 Start Game
          </button>
        ) : gameData.isHost ? (
          <div className="waiting-message">
            <p>⏳ Waiting for all {gameData.totalPlayers} players to join...</p>
            <p className="players-info">({gameData.playerCount}/{gameData.totalPlayers} joined)</p>
          </div>
        ) : (
          <div className="waiting-message">
            <p>⏳ Waiting for host to start the game...</p>
            <div className="spinner"></div>
          </div>
        )}

        <div className="share-info">
          <p>📢 <strong>Share this Game ID with friends:</strong></p>
          <p className="game-id-display">{gameData.gameId}</p>
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;

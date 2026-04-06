import React, { useState } from 'react';
import WordSelector from './WordSelector';
import DescriptionInput from './DescriptionInput';
import '../styles/GamePlay.css';

function GamePlay({
  players,
  currentPlayerIndex,
  gameState,
  onSelectWord,
  onDescriptionSubmit,
}) {
  const [wordSelected, setWordSelected] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  const isImpostor = currentPlayerIndex === gameState.impostorIndex;

  const handleWordSelected = (word, impostorWord) => {
    onSelectWord(word, impostorWord);
    setWordSelected(true);
  };

  return (
    <div className="game-play">
      <div className="game-header">
        <h2>Description Round</h2>
        <p className="player-indicator">
          Player {currentPlayerIndex + 1}/{players.length}: <span className="player-name">{currentPlayer}</span>
        </p>
      </div>

      {!wordSelected ? (
        <WordSelector onWordSelected={handleWordSelected} isImpostor={isImpostor} />
      ) : (
        <>
          <div className="word-display">
            {isImpostor ? (
              <div className="impostor-word">
                <p className="impostor-label">🎭 Your Clue Word:</p>
                <p className="word-text">{gameState.impostorWord}</p>
                <p className="impostor-hint">You are the Impostor! Describe this clue word in one word.</p>
              </div>
            ) : (
              <div className="normal-word">
                <p className="word-label">Your Word:</p>
                <p className="word-text">{gameState.word}</p>
                <p className="hint">Describe this word in one word.</p>
              </div>
            )}
          </div>

          <DescriptionInput
            playerName={currentPlayer}
            onSubmit={onDescriptionSubmit}
            isLastPlayer={currentPlayerIndex === players.length - 1}
          />
        </>
      )}

      <div className="descriptions-so-far">
        <h3>Descriptions so far:</h3>
        <div className="descriptions-list">
          {Object.entries(gameState.descriptions).map(([playerName, description]) => (
            <div key={playerName} className="description-item">
              <span className="player-desc-name">{playerName}:</span>
              <span className="description-text">{description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamePlay;

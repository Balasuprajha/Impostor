import React, { useState, useEffect } from 'react';
import '../styles/WordSelector.css';

const WORD_PAIRS = [
  { word: 'toothbrush', impostorWord: 'cleaning' },
  { word: 'smartphone', impostorWord: 'communication' },
  { word: 'bicycle', impostorWord: 'transportation' },
  { word: 'pillow', impostorWord: 'comfort' },
  { word: 'coffee', impostorWord: 'caffeine' },
  { word: 'book', impostorWord: 'knowledge' },
  { word: 'piano', impostorWord: 'music' },
  { word: 'camera', impostorWord: 'photography' },
  { word: 'telescope', impostorWord: 'space' },
  { word: 'refrigerator', impostorWord: 'preservation' },
  { word: 'guitar', impostorWord: 'melody' },
  { word: 'lighthouse', impostorWord: 'navigation' },
  { word: 'volcano', impostorWord: 'eruption' },
  { word: 'dinosaur', impostorWord: 'extinction' },
  { word: 'compass', impostorWord: 'direction' },
  { word: 'mirror', impostorWord: 'reflection' },
  { word: 'hourglass', impostorWord: 'time' },
  { word: 'butterfly', impostorWord: 'metamorphosis' },
  { word: 'castle', impostorWord: 'royalty' },
  { word: 'candle', impostorWord: 'light' },
  { word: 'clock', impostorWord: 'time' },
  { word: 'envelope', impostorWord: 'mail' },
  { word: 'football', impostorWord: 'sport' },
  { word: 'hammer', impostorWord: 'construction' },
  { word: 'jockey', impostorWord: 'horse' },
  { word: 'keyboard', impostorWord: 'typing' },
  { word: 'lantern', impostorWord: 'light' },
  { word: 'microscope', impostorWord: 'cells' },
  { word: 'notebook', impostorWord: 'writing' },
  { word: 'oxygen', impostorWord: 'breathing' },
];

function WordSelector({ onWordSelected, isImpostor }) {
  const [selectedWordPair, setSelectedWordPair] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * WORD_PAIRS.length);
    setSelectedWordPair(WORD_PAIRS[randomIndex]);
  }, []);

  const handleSelectWord = () => {
    if (selectedWordPair) {
      onWordSelected(selectedWordPair.word, selectedWordPair.impostorWord);
    }
  };

  const handleChangeWord = () => {
    const randomIndex = Math.floor(Math.random() * WORD_PAIRS.length);
    setSelectedWordPair(WORD_PAIRS[randomIndex]);
  };

  return (
    <div className="word-selector">
      <div className="word-selector-container">
        <h3>Selecting a word...</h3>
        {selectedWordPair && (
          <div className="word-pair-display">
            <div className="real-word-preview">
              <p className="preview-label">Real Word:</p>
              <p className="preview-text">{selectedWordPair.word}</p>
            </div>
            <div className="impostor-word-preview">
              <p className="preview-label">Impostor Clue:</p>
              <p className="preview-text">{selectedWordPair.impostorWord}</p>
            </div>
          </div>
        )}
        <div className="selector-buttons">
          <button className="change-word-btn" onClick={handleChangeWord}>
            Change Word
          </button>
          <button className="confirm-btn" onClick={handleSelectWord}>
            Confirm & Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default WordSelector;

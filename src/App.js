import React, { useState, useEffect } from 'react';
import './App.css';
import HostSetup from './components/HostSetup';
import PlayerLogin from './components/PlayerLogin';
import DescriptionInput from './components/DescriptionInput';
import HostReveal from './components/HostReveal';
import VotingPhase from './components/VotingPhase';
import GameResults from './components/GameResults';

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
];

function App() {
  const [gamePhase, setGamePhase] = useState('hostSetup'); // hostSetup, playerLogin, describing, hostReveal, voting, results
  const [gameData, setGameData] = useState({
    players: [],
    impostorIndex: null,
    wordPair: null,
    descriptions: {},
    votes: {},
  });
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('wordImpostorGame');
    if (savedGame) {
      const parsed = JSON.parse(savedGame);
      setGameData(parsed.gameData);
      setCurrentPlayerIndex(parsed.currentPlayerIndex);
      setGamePhase(parsed.gamePhase);
    }
  }, []);

  // Save to localStorage whenever game state changes
  useEffect(() => {
    localStorage.setItem('wordImpostorGame', JSON.stringify({
      gamePhase,
      gameData,
      currentPlayerIndex,
    }));
  }, [gamePhase, gameData, currentPlayerIndex]);

  const handleHostStartGame = (numPlayers, selectedWordPair) => {
    const impostorIdx = Math.floor(Math.random() * numPlayers);
    const players = Array.from({ length: numPlayers }, (_, i) => `Player ${i + 1}`);
    
    setGameData({
      players,
      impostorIndex: impostorIdx,
      wordPair: selectedWordPair,
      descriptions: {},
      votes: {},
    });
    setCurrentPlayerIndex(0);
    setGamePhase('playerLogin');
  };

  const handlePlayerLogin = (playerName) => {
    const updatedPlayers = [...gameData.players];
    updatedPlayers[currentPlayerIndex] = playerName;
    
    setGameData(prev => ({ ...prev, players: updatedPlayers }));
    setGamePhase('describing');
  };

  const handleDescriptionSubmit = (description) => {
    const playerName = gameData.players[currentPlayerIndex];
    
    setGameData(prev => ({
      ...prev,
      descriptions: {
        ...prev.descriptions,
        [playerName]: description,
      },
    }));

    if (currentPlayerIndex < gameData.players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setGamePhase('playerLogin');
    } else {
      setGamePhase('hostReveal');
    }
  };

  const handleRevealAll = () => {
    setCurrentPlayerIndex(0);
    setGamePhase('voting');
  };

  const handleVote = (votedPlayer) => {
    const voter = gameData.players[currentPlayerIndex];
    
    setGameData(prev => ({
      ...prev,
      votes: {
        ...prev.votes,
        [voter]: votedPlayer,
      },
    }));

    if (currentPlayerIndex < gameData.players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setGamePhase('results');
    }
  };

  const handlePlayAgain = () => {
    localStorage.removeItem('wordImpostorGame');
    setGamePhase('hostSetup');
    setGameData({
      players: [],
      impostorIndex: null,
      wordPair: null,
      descriptions: {},
      votes: {},
    });
    setCurrentPlayerIndex(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎭 Word Impostor Game</h1>
      </header>
      <main className="App-main">
        {gamePhase === 'hostSetup' && (
          <HostSetup 
            wordPairs={WORD_PAIRS}
            onStartGame={handleHostStartGame}
          />
        )}
        {gamePhase === 'playerLogin' && (
          <PlayerLogin
            playerNumber={currentPlayerIndex + 1}
            totalPlayers={gameData.players.length}
            currentPlayerName={gameData.players[currentPlayerIndex]}
            onLogin={handlePlayerLogin}
          />
        )}
        {gamePhase === 'describing' && (
          <DescriptionInput
            playerNumber={currentPlayerIndex + 1}
            totalPlayers={gameData.players.length}
            playerName={gameData.players[currentPlayerIndex]}
            isImpostor={currentPlayerIndex === gameData.impostorIndex}
            word={currentPlayerIndex === gameData.impostorIndex ? gameData.wordPair.impostorWord : gameData.wordPair.word}
            onSubmit={handleDescriptionSubmit}
          />
        )}
        {gamePhase === 'hostReveal' && (
          <HostReveal
            wordPair={gameData.wordPair}
            impostorIndex={gameData.impostorIndex}
            players={gameData.players}
            descriptions={gameData.descriptions}
            onReveal={handleRevealAll}
          />
        )}
        {gamePhase === 'voting' && (
          <VotingPhase
            players={gameData.players}
            descriptions={gameData.descriptions}
            currentPlayerIndex={currentPlayerIndex}
            onVote={handleVote}
            isLastVoter={currentPlayerIndex === gameData.players.length - 1}
          />
        )}
        {gamePhase === 'results' && (
          <GameResults
            players={gameData.players}
            impostorIndex={gameData.impostorIndex}
            wordPair={gameData.wordPair}
            descriptions={gameData.descriptions}
            votes={gameData.votes}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </main>
    </div>
  );
}

export default App;

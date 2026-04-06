import React, { useState } from 'react';
import './App.css';
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';
import VotingPhase from './components/VotingPhase';
import GameResults from './components/GameResults';

function App() {
  const [gamePhase, setGamePhase] = useState('setup'); // setup, playing, voting, results
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameState, setGameState] = useState({
    word: '',
    impostorWord: '',
    impostorIndex: null,
    descriptions: {},
    votes: {},
  });

  const handleStartGame = (playerList) => {
    setPlayers(playerList);
    const impostorIdx = Math.floor(Math.random() * playerList.length);
    setGameState({
      word: '',
      impostorWord: '',
      impostorIndex: impostorIdx,
      descriptions: {},
      votes: {},
    });
    setCurrentPlayerIndex(0);
    setGamePhase('playing');
  };

  const handleSelectWord = (word, impostorWord) => {
    setGameState(prev => ({
      ...prev,
      word,
      impostorWord,
    }));
  };

  const handleDescriptionSubmit = (description) => {
    const playerName = players[currentPlayerIndex];
    setGameState(prev => ({
      ...prev,
      descriptions: {
        ...prev.descriptions,
        [playerName]: description,
      },
    }));

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setGamePhase('voting');
    }
  };

  const handleVote = (impostorGuess) => {
    setGameState(prev => ({
      ...prev,
      votes: {
        ...prev.votes,
        [players[currentPlayerIndex]]: impostorGuess,
      },
    }));

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setGamePhase('results');
    }
  };

  const handlePlayAgain = () => {
    setGamePhase('setup');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setGameState({
      word: '',
      impostorWord: '',
      impostorIndex: null,
      descriptions: {},
      votes: {},
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎭 Word Impostor Game</h1>
      </header>
      <main className="App-main">
        {gamePhase === 'setup' && <GameSetup onStartGame={handleStartGame} />}
        {gamePhase === 'playing' && (
          <GamePlay
            players={players}
            currentPlayerIndex={currentPlayerIndex}
            gameState={gameState}
            onSelectWord={handleSelectWord}
            onDescriptionSubmit={handleDescriptionSubmit}
          />
        )}
        {gamePhase === 'voting' && (
          <VotingPhase
            players={players}
            currentPlayerIndex={currentPlayerIndex}
            gameState={gameState}
            onVote={handleVote}
          />
        )}
        {gamePhase === 'results' && (
          <GameResults
            players={players}
            gameState={gameState}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </main>
    </div>
  );
}

export default App;

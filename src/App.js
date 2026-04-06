import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import HostSetup from './components/HostSetup';
import JoinGame from './components/JoinGame';
import WaitingRoom from './components/WaitingRoom';
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

const BACKEND_URL = 'https://impostor-xfcc.vercel.app';

function App() {
  const [socket, setSocket] = useState(null);
  const [phase, setPhase] = useState('menu'); // menu, hostSetup, joinGame, waitingRoom, describing, hostReveal, voting, results
  const [gameData, setGameData] = useState({
    gameId: null,
    isHost: false,
    isImpostor: false,
    playerName: null,
    wordPair: null,
    players: [],
    descriptions: {},
    votes: {},
    gamePhase: null,
    playerCount: 0,
    totalPlayers: 0,
  });

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(BACKEND_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      transports: ['polling'],
      upgrade: false,
      rememberUpgrade: false,
      query: {
        'EIO': 4,
        'transport': 'polling'
      }
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
    });

    newSocket.on('playerJoined', (data) => {
      console.log('Player joined:', data);
      setGameData(prev => ({
        ...prev,
        playerCount: data.playerCount,
        totalPlayers: data.totalPlayers,
      }));
    });

    newSocket.on('gameStarted', (data) => {
      console.log('Game started:', data);
      setGameData(prev => ({
        ...prev,
        wordPair: data.wordPair,
        players: data.players,
        gamePhase: 'filling',
      }));
      setPhase('describing');
    });

    newSocket.on('descriptionReceived', (data) => {
      console.log('Description received:', data);
      setGameData(prev => ({
        ...prev,
        descriptions: {
          ...prev.descriptions,
          [data.playerName]: data.description,
        },
      }));
    });

    newSocket.on('allDescriptionsSubmitted', (data) => {
      console.log('All descriptions submitted');
      setGameData(prev => ({
        ...prev,
        descriptions: data.descriptions,
        gamePhase: 'revealing',
      }));
      setPhase('hostReveal');
    });

    newSocket.on('descriptionsRevealed', (data) => {
      console.log('Descriptions revealed');
      setGameData(prev => ({
        ...prev,
        descriptions: data.descriptions,
        gamePhase: 'voting',
      }));
      setPhase('voting');
    });

    newSocket.on('voteReceived', (data) => {
      console.log('Vote received:', data);
    });

    newSocket.on('gameResults', (data) => {
      console.log('Game results:', data);
      setGameData(prev => ({
        ...prev,
        descriptions: data.descriptions,
        votes: data.votes,
        gamePhase: 'results',
      }));
      setPhase('results');
    });

    newSocket.on('gameRestarted', () => {
      setPhase('waitingRoom');
      setGameData(prev => ({
        ...prev,
        descriptions: {},
        votes: {},
      }));
    });

    newSocket.on('hostDisconnected', () => {
      alert('Host disconnected. Game ended.');
      setPhase('menu');
      setGameData({
        gameId: null,
        isHost: false,
        isImpostor: false,
        playerName: null,
        wordPair: null,
        players: [],
        descriptions: {},
        votes: {},
        gamePhase: null,
        playerCount: 0,
        totalPlayers: 0,
      });
    });

    newSocket.on('playerLeft', (data) => {
      setGameData(prev => ({
        ...prev,
        playerCount: data.playerCount,
        totalPlayers: data.totalPlayers,
      }));
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleCreateGame = (numPlayers, wordPair, playerName) => {
    if (socket) {
      socket.emit('createGame', { numPlayers, wordPair, playerName }, (data) => {
        setGameData(prev => ({
          ...prev,
          gameId: data.gameId,
          isHost: true,
          playerName: playerName,
          wordPair: wordPair,
          totalPlayers: numPlayers,
          playerCount: 1,
          isImpostor: true
        }));
        setPhase('waitingRoom');
      });
    }
  };

  const handleJoinGame = (gameId, playerName) => {
    if (socket) {
      socket.emit('joinGame', { gameId, playerName }, (result) => {
        if (result.success) {
          setGameData(prev => ({
            ...prev,
            gameId,
            playerName,
            isHost: false,
          }));
          socket.emit('getGameState', (state) => {
            setGameData(prev => ({
              ...prev,
              ...state,
              playerName,
              isHost: false,
            }));
            setPhase('waitingRoom');
          });
        } else {
          alert('Error joining game: ' + result.error);
        }
      });
    }
  };

  const handleStartGame = () => {
    if (socket && gameData.isHost) {
      socket.emit('startGame');
    }
  };

  const handleSubmitDescription = (description) => {
    if (socket) {
      socket.emit('submitDescription', description);
      setPhase('waitingRoom'); // Show waiting message
    }
  };

  const handleRevealDescriptions = () => {
    if (socket && gameData.isHost) {
      socket.emit('revealDescriptions');
    }
  };

  const handleVote = (votedPlayerName) => {
    if (socket) {
      socket.emit('submitVote', votedPlayerName);
    }
  };

  const handlePlayAgain = () => {
    if (socket && gameData.isHost) {
      socket.emit('restartGame');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎭 Word Impostor Game</h1>
      </header>
      <main className="App-main">
        {phase === 'menu' && (
          <Menu onCreateGame={handleCreateGame} onJoinGame={handleJoinGame} />
        )}
        {phase === 'hostSetup' && (
          <HostSetup wordPairs={WORD_PAIRS} onStartGame={handleCreateGame} />
        )}
        {phase === 'waitingRoom' && (
          <WaitingRoom
            gameData={gameData}
            onStartGame={handleStartGame}
          />
        )}
        {phase === 'describing' && (
          <DescriptionInput
            playerName={gameData.playerName}
            isImpostor={gameData.isImpostor}
            word={gameData.isImpostor ? gameData.wordPair.impostorWord : gameData.wordPair.word}
            onSubmit={handleSubmitDescription}
          />
        )}
        {phase === 'hostReveal' && (
          <HostReveal
            wordPair={gameData.wordPair}
            players={gameData.players}
            descriptions={gameData.descriptions}
            onReveal={handleRevealDescriptions}
          />
        )}
        {phase === 'voting' && (
          <VotingPhase
            players={gameData.players}
            descriptions={gameData.descriptions}
            playerName={gameData.playerName}
            onVote={handleVote}
          />
        )}
        {phase === 'results' && (
          <GameResults
            players={gameData.players}
            wordPair={gameData.wordPair}
            descriptions={gameData.descriptions}
            votes={gameData.votes}
            isHost={gameData.isHost}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </main>
    </div>
  );
}

function Menu({ onCreateGame, onJoinGame }) {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  return (
    <div className="menu-container">
      <div className="menu-box">
        <h2>Welcome to Word Impostor Game!</h2>
        <p className="menu-subtitle">Play with your colleagues online</p>
        
        {!showCreate && !showJoin ? (
          <div className="menu-buttons">
            <button className="menu-btn create-btn" onClick={() => setShowCreate(true)}>
              ➕ Create Game
            </button>
            <button className="menu-btn join-btn" onClick={() => setShowJoin(true)}>
              🚪 Join Game
            </button>
          </div>
        ) : showCreate ? (
          <HostSetup 
            wordPairs={[
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
            ]}
            onStartGame={(numPlayers, wordPair, playerName) => {
              onCreateGame(numPlayers, wordPair, playerName);
            }}
          />
        ) : (
          <JoinGame onJoinGame={onJoinGame} />
        )}
      </div>
    </div>
  );
}

export default App;

# 🎭 Word Impostor Game - Multiplayer

A fun **real-time multiplayer word game** where players join from different devices, describe a secret word, and vote to identify the Impostor!

## Game Rules

1. **Setup**: Host creates a game and shares Game ID
2. **Joining**: Up to 12 players join using the Game ID
3. **Word Distribution**: 
   - 11 players get the REAL word
   - 1 player (Impostor) gets a RELATED word
4. **Description Round**: Each player describes their word in ONE word on their device
5. **Reveal**: Host reveals all descriptions
6. **Voting Round**: Everyone votes on who they think is the Impostor
7. **Results**: 
   - If team votes for Impostor → **Team Wins!** 🎉
   - If Impostor isn't found → **Impostor Wins!** 😈

## ✨ Features

✅ Multi-device gameplay (players on different phones/laptops)  
✅ Real-time synchronization with Socket.io  
✅ Host control panel  
✅ Secret word display (private per device)  
✅ Easy game sharing via Game ID  
✅ Real-time vote counting  
✅ Support for 2-12 players  
✅ Beautiful responsive UI  

## 🚀 Quick Start

### Installation

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### Running Locally

**Terminal 1: Start Backend**
```bash
cd backend
npm start
```

**Terminal 2: Start Frontend**
```bash
npm start
```

Open `http://localhost:3000` in your browser

### How to Play

1. Click "Create Game" (host) or "Join Game" (players)
2. Host shares the Game ID
3. Players join and game starts
4. Each player gets a secret word
5. Describe in ONE word
6. Host reveals all descriptions
7. Everyone votes
8. See results!

## Features

✅ Support for up to 12 players
✅ 30+ word pairs for variety
✅ Clear role assignments (Impostor vs Team)
✅ Real-time game flow tracking
✅ Beautiful, responsive UI
✅ Vote tallying and results display
✅ Play multiple rounds

## Word Pairs Included

- toothbrush ↔ cleaning
- smartphone ↔ communication
- bicycle ↔ transportation
- pillow ↔ comfort
- coffee ↔ caffeine
- book ↔ knowledge
- piano ↔ music
- camera ↔ photography
- telescope ↔ space
- refrigerator ↔ preservation
- guitar ↔ melody
- lighthouse ↔ navigation
- volcano ↔ eruption
- dinosaur ↔ extinction
- compass ↔ direction
- And many more!

## Tips for Better Gameplay

1. **Be Vague**: Don't give away too much in your description
2. **Listen Carefully**: Pay attention to descriptions to find patterns
3. **The Impostor Should Blend In**: Use descriptions related to your clue word but try to sound like you know the real word
4. **Discuss**: Take time to discuss before voting - it's part of the fun!

## Tech Stack

- React 18.2
- CSS3 (Responsive Design)
- No external UI libraries (vanilla CSS)

## Browser Support

Works on all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Troubleshooting

### Port 3000 is already in use
Run the app on a different port:
```bash
PORT=3001 npm start
```

### npm install fails
Delete `node_modules` and try again:
```bash
rm -rf node_modules
npm install
```

## Future Features

- 🎮 Online multiplayer (Socket.io)
- 🌐 Different language support
- 📊 Game statistics tracking
- 🏆 Leaderboard
- 🎨 Custom word packs
- 🔊 Optional voice chat integration

## License

MIT License - Feel free to use and modify!

---

Enjoy the game! 🎉

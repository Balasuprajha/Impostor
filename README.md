# 🎭 Word Impostor Game

A fun multiplayer word game where players try to identify the impostor!

## Game Rules

1. **Setup**: 11 players get the SAME word, 1 player (the Impostor) gets a RELATED word
2. **Description Round**: Each player describes their word in just ONE word
3. **Discussion**: Players discuss and share their thoughts (optional)
4. **Voting Round**: Each player votes on who they think is the Impostor
5. **Results**: 
   - If the team votes for the Impostor → **Team Wins!** 🎉
   - If the Impostor isn't found → **Impostor Wins!** 😈

## How to Play

### Installation

1. Navigate to the project directory:
```bash
cd GameCode
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser to `http://localhost:3000`

### Game Flow

1. **Enter Player Names**: Type in up to 12 player names
2. **Start Game**: Click "Start Game" button
3. **Word Selection**: The first player will see both the real word and the impostor's clue - no need to share these visually
4. **Description Round**: Each player sees ONLY their assigned word (real or clue) and submits a one-word description
5. **Voting Round**: All players vote on who they think is the Impostor
6. **Results**: See who was the Impostor and who won!

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

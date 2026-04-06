# 🎭 Word Impostor Game - Multiplayer Edition

A **real-time multiplayer word game** where players join from different devices, guess a secret word, and vote to identify the Impostor!

## ✨ Features

✅ **Multi-device gameplay** - Players join from different devices  
✅ **Real-time synchronization** - Using Socket.io  
✅ **Host control** - Host can manage game flow  
✅ **Secret words** - Each player only sees their word  
✅ **Easy sharing** - Just share the Game ID  
✅ **Real-time voting** - Everyone votes simultaneously  

---

## 🚀 Deployment Guide

### **LOCAL TESTING** (Before Deployment)

#### **Terminal 1: Start Backend**
```bash
cd backend
npm install
npm start
```
Backend runs on `http://localhost:4000`

#### **Terminal 2: Start Frontend**
```bash
cd src
npm install
npm start
```
Frontend runs on `http://localhost:3000`

---

## 🌍 PRODUCTION DEPLOYMENT

### **Option 1: Vercel (Recommended - Easiest)**

#### **Deploy Backend to Vercel**

1. **Update backend/.env for production:**
```env
PORT=4000
FRONTEND_URL=https://your-frontend.vercel.app
```

2. **Create `backend/vercel.json`:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

3. **Push to GitHub and deploy:**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Select your repository
- Set Root Directory to `backend`
- Deploy!

#### **Deploy Frontend to Vercel**

1. **Update `.env`:**
```env
REACT_APP_BACKEND_URL=https://your-backend.vercel.app
```

2. **Deploy:**
- New Project (frontend folder)
- Environment: Add `REACT_APP_BACKEND_URL=https://your-backend.vercel.app`
- Deploy!

---

### **Option 2: Heroku (Free Tier)**

#### **Deploy Backend to Heroku**

```bash
cd backend
heroku login
heroku create word-impostor-game-api
git push heroku main
```

#### **Deploy Frontend to Netlify**

```bash
npm run build
# Drag & drop 'build' folder to netlify.com
```

---

### **Option 3: Railway.app (Easiest for Beginners)**

1. Create account at [railway.app](https://railway.app)
2. Connect GitHub
3. Select backend folder, deploy
4. Get backend URL from dashboard
5. Update frontend .env and redeploy frontend

---

## 📖 How to Play

### **For Host (Game Creator):**
1. Click "Create Game"  
2. Enter your name & number of players  
3. Select a word pair  
4. Click "Create & Start Game"  
5. **Share the Game ID** with other players  
6. Wait for all players to join  
7. Click "Start Game"  
8. Review descriptions and reveal  

### **For Players:**
1. Click "Join Game"  
2. Enter Game ID (from host)  
3. Enter your name  
4. See your secret word (real or impostor clue)  
5. Enter ONE-word description  
6. Wait for host to reveal  
7. Vote for who you think is the Impostor  
8. See results!  

---

## 🔧 Troubleshooting

### **Frontend can't connect to backend**
- Check `REACT_APP_BACKEND_URL` in `.env`
- Ensure backend is running
- Check CORS settings in `backend/server.js`

### **Backend connection refused**
- Install dependencies: `npm install` in backend folder
- Ensure port 4000 is not in use
- Try: `lsof -i :4000` (macOS/Linux) or `netstat -ano | findstr :4000` (Windows)

### **Players not syncing**
- Check WebSocket connection in browser DevTools
- Verify backend is accessible from player devices
- Check firewall settings

---

## 📦 Project Structure

```
GameCode/
├── backend/
│   ├── server.js (Socket.io server)
│   ├── package.json
│   └── .env
├── src/
│   ├── components/
│   │   ├── HostSetup.js
│   │   ├── JoinGame.js
│   │   ├── WaitingRoom.js
│   │   ├── DescriptionInput.js
│   │   ├── HostReveal.js
│   │   ├── VotingPhase.js
│   │   └── GameResults.js
│   ├── App.js
│   └── index.js
├── package.json
└── .env
```

---

## 🎮 Word Pairs Included

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
- mirror ↔ reflection
- hourglass ↔ time
- butterfly ↔ metamorphosis
- castle ↔ royalty
- candle ↔ light

---

## 🛠 Technologies Used

**Frontend:**
- React 18.2
- Socket.io-client
- CSS3 (Responsive)

**Backend:**
- Node.js + Express
- Socket.io (Real-time)
- CORS enabled

---

## 📝 License

MIT - Free to use and modify!

---

## 🎉 Enjoy Playing!

Have fun with your colleagues! 🎭👥


# 🎮 Simon Game Workshop

Welcome to the Simon Game workshop! Follow these steps to get the multiplayer Simon Says game running locally and deployed to the cloud.

---

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ **Node.js 18+** installed → [Download here](https://nodejs.org)
- ✅ **Git** installed → [Download here](https://git-scm.com)
- ✅ **GitHub account** → [Sign up](https://github.com)
- ✅ **Render.com account** (free tier) → [Sign up](https://render.com)

---

## Step 1: Clone the Repository

Open your terminal and run:

```bash
# Clone the repo
git clone https://github.com/itayshmool/simon-game-app-cday.git

# Enter the project folder
cd simon-game-app-cday
```

---

## Step 2: Setup Environment

Run the setup script to configure everything:

```bash
npm run setup
```

This will:
- ✅ Create `.env` files from templates
- ✅ Install backend dependencies
- ✅ Install frontend dependencies

> 💡 **Note:** The default values work for local development - no changes needed!

---

## Step 3: Run Locally

You need **two terminal windows**:

### Terminal 1 - Backend Server
```bash
npm run dev:backend
```
You should see:
```
🎮 SIMON GAME SERVER
   🌐 HTTP:      http://localhost:3000
   🔌 WebSocket: ws://localhost:3000
```

### Terminal 2 - Frontend App
```bash
cd frontend && npm run dev
```
You should see:
```
VITE v7.x.x ready
➜  Local:   http://localhost:5173/
```

### Open in Browser

Go to: **http://localhost:5173**

---

## Step 4: Test the Game Locally

1. Click **"Create Game"**
2. Enter your name, pick an avatar
3. Click **"Create Game"**
4. Copy the **game code** (e.g., `ABC123`)
5. Open a **new browser tab** (or incognito window)
6. Click **"Join Game"**
7. Paste the game code, enter a different name
8. Go back to first tab → Click **"Start Game"**
9. Play! 🎮

---

## Step 5: Deploy to Render

### 5.1 Create Your Own GitHub Repository

First, create a new repository on GitHub:
1. Go to [github.com/new](https://github.com/new)
2. Name it `simon-game-app` (or any name you like)
3. Keep it **Public**
4. **Don't** initialize with README
5. Click **Create repository**

Then push the code:

```bash
# Remove the original remote
git remote remove origin
git remote remove cday

# Add your own remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/simon-game-app.git

# Push to your repo
git push -u origin main
```

### 5.2 Deploy on Render

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **New** → **Blueprint**
3. Connect your GitHub account (if not already)
4. Select your `simon-game-app` repository
5. Render will detect `render.yaml` automatically
6. Click **Apply**

Wait for both services to deploy (5-10 minutes).

### 5.3 Get Your URLs

After deployment, you'll have two URLs like:
- **Backend:** `https://simon-game-backend-xxxx.onrender.com`
- **Frontend:** `https://simon-game-frontend-xxxx.onrender.com`

### 5.4 Configure Environment Variables

**Backend Service:**
1. Go to your backend service in Render dashboard
2. Click **Environment**
3. Set `FRONTEND_URL` to your frontend URL (e.g., `https://simon-game-frontend-xxxx.onrender.com`)
4. Click **Save Changes**

**Frontend Service:**
1. Go to your frontend service in Render dashboard
2. Click **Environment**
3. Set both:
   - `VITE_API_URL` = your backend URL
   - `VITE_SOCKET_URL` = your backend URL
4. Click **Save Changes**

> ⚠️ After changing env vars, Render will automatically redeploy.

### 5.5 Test Your Deployed Game

1. Open your frontend URL in the browser
2. Create a game
3. Share the link with a friend
4. Play together! 🎉

---

## 🎉 Congratulations!

You've successfully:
- ✅ Cloned and set up a full-stack TypeScript project
- ✅ Run a React + Express + WebSocket app locally
- ✅ Deployed to the cloud with Render

---

## 🛠️ Troubleshooting

### Backend won't start
- Make sure port 3000 is not in use
- Check that `npm install` completed successfully

### Frontend can't connect
- Verify backend is running on port 3000
- Check browser console for errors

### Render deployment fails
- Check build logs in Render dashboard
- Make sure all environment variables are set

### WebSocket connection issues
- Ensure `VITE_SOCKET_URL` matches your backend URL
- Use `https://` (not `http://`) for deployed URLs

---

## 📚 Project Structure

```
simon-game-app/
├── src/
│   ├── backend/         # Express + Socket.io server
│   │   ├── controllers/ # HTTP endpoints
│   │   ├── services/    # Game logic
│   │   ├── websocket/   # Real-time handlers
│   │   └── utils/       # Helpers
│   └── shared/          # Shared TypeScript types
├── frontend/
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── services/    # API & socket clients
│       └── store/       # Zustand state
├── tests/               # Test files
├── render.yaml          # Render deployment config
└── package.json
```

---

## 🔗 Useful Links

- [Node.js](https://nodejs.org)
- [React](https://react.dev)
- [Socket.io](https://socket.io)
- [Render Docs](https://render.com/docs)
- [TypeScript](https://www.typescriptlang.org)

---

**Happy coding! 🚀**

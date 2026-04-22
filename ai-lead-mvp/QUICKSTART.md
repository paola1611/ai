## Quick Start Guide

### 1️⃣ Setup (One-time)

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk_test_xxx...
```

### 2️⃣ Run the App

**Option A: Development (Recommended for testing)**

```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend (in another terminal)
npm run dev
```

Then open http://localhost:5173 in your browser

**Option B: Production Ready**

```bash
# Build frontend
npm run build

# Start server (serves everything)
npm run server
```

Then open http://localhost:3001 in your browser

### 3️⃣ Test It

1. Go to "Submit Lead" tab
2. Fill in name, email, and a message like:
   - "I'd like to purchase your premium plan" → Should classify as **Sales**
   - "I'm having issues with my account login" → Should classify as **Support**
   - "Just checking out your website" → Should classify as **Other**
3. Click "Submit Lead"
4. Check the "Dashboard" tab to see your submission with AI classification

### 📋 What Gets Installed

The following packages are added to package.json:
- **express**: Web server framework
- **sqlite3**: Database
- **openai**: AI classification
- **dotenv**: Environment variables
- **cors**: Cross-origin requests
- **tailwindcss**: Styling

### 🔑 Required OpenAI API Key

Get a free/paid API key from:
https://platform.openai.com/api-keys

The app uses `gpt-3.5-turbo` which is very affordable (~$0.001 per classification).

### 📁 Files Structure

```
Core Files:
- server.js        ← Express backend
- database.js      ← SQLite setup & queries
- classifier.js    ← OpenAI integration
- src/App.jsx      ← Main React component
- src/components/  ← Form & Dashboard
```

### ✅ Common Issues

**"Cannot find module"** → Run `npm install`

**API Error** → Check .env has correct OPENAI_API_KEY

**Port already in use** → Change PORT in .env (default 3001)

**Database locked** → Delete leads.db and restart

Need help? Check the full README.md for more details!

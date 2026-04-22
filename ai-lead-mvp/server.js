import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config();

import express from 'express';
import cors from 'cors';
import { initDb, insertSubmission, getAllSubmissions } from './database.js';
import { classifyMessage } from './classifier.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDb();

// Serve static files from dist
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

// Routes

/**
 * POST /api/submit
 * Receives name, email, message
 * Classifies message using OpenAI
 * Stores in database
 */
app.post('/api/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required',
      });
    }

    // Classify message
    const classification = await classifyMessage(message);

    // Store in database
    const id = insertSubmission(name, email, message, classification);

    res.status(201).json({
      id,
      name,
      email,
      message,
      classification,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /api/submit:', error);
    res.status(500).json({ error: 'Failed to process submission' });
  }
});

/**
 * GET /api/dashboard
 * Returns all submissions
 */
app.get('/api/dashboard', async (req, res) => {
  try {
    const submissions = await getAllSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error('Error in /api/dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Serve React app for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

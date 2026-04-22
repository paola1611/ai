import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'leads.db');

let db;

/**
 * Initialize database and create table if it doesn't exist
 */
export function initDb() {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Connected to SQLite database');
      createTable();
    }
  });
}

/**
 * Create submissions table
 */
function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      classification TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Submissions table ready');
    }
  });
}

/**
 * Insert a new submission
 */
export function insertSubmission(name, email, message, classification) {
  const sql = `
    INSERT INTO submissions (name, email, message, classification)
    VALUES (?, ?, ?, ?)
  `;

  let id;
  db.run(sql, [name, email, message, classification], function (err) {
    if (err) {
      console.error('Error inserting submission:', err);
    } else {
      id = this.lastID;
      console.log(`Submission inserted with ID: ${id}`);
    }
  });

  return id;
}

/**
 * Get all submissions
 */
export function getAllSubmissions() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM submissions ORDER BY created_at DESC';

    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error fetching submissions:', err);
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
}

/**
 * Close database connection
 */
export function closeDb() {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

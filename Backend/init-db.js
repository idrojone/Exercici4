const Database = require('better-sqlite3');
const db = new Database('./data.sqlite');

db.exec(`
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  name TEXT,
  passwordHash TEXT,
  preferredLanguage TEXT DEFAULT 'en',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS jokes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chuckId TEXT UNIQUE,
  content TEXT,
  originalLang TEXT DEFAULT 'en',
  categoryId INTEGER,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS translated_jokes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jokeId TEXT,
  targetLang TEXT,
  translatedText TEXT,
  provider TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(jokeId, targetLang),
  FOREIGN KEY (jokeId) REFERENCES jokes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_joke_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  jokeId TEXT,
  langViewed TEXT,
  viewedAt TEXT DEFAULT CURRENT_TIMESTAMP,
  durationSeconds INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_session (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  sessionToken TEXT UNIQUE,
  startedAt TEXT DEFAULT CURRENT_TIMESTAMP,
  lastActivityAt TEXT,
  durationSeconds INTEGER DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_session_userId ON user_session(userId);
`);
console.log('DB initialized (data.sqlite created)');
db.close();
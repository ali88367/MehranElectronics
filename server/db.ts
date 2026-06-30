import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'data', 'products.db');

import fs from 'fs';
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    model TEXT DEFAULT '',
    category TEXT NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    image TEXT DEFAULT '',
    description TEXT DEFAULT '',
    features TEXT DEFAULT '',
    isBestSeller INTEGER DEFAULT 0,
    isFeatured INTEGER DEFAULT 0,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  )
`);

export default db;

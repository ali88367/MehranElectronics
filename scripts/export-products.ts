import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'data', 'products.db');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data', 'products.json');

if (!fs.existsSync(DB_PATH)) {
  console.log('No database found — skipping export, will use mock data.');
  process.exit(0);
}

const db = new Database(DB_PATH, { readonly: true });
const rows = db.prepare('SELECT * FROM products ORDER BY createdAt DESC').all() as any[];

const products = rows.map(row => ({
  id: row.id,
  name: row.name,
  model: row.model || '',
  category: row.category,
  price: row.price,
  image: row.image,
  description: row.description,
  features: row.features ? row.features.split('|||') : [],
  isBestSeller: !!row.isBestSeller,
  isFeatured: !!row.isFeatured,
}));

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2));
console.log(`Exported ${products.length} products to public/data/products.json`);

db.close();

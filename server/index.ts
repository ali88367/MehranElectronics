import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'products');

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.use(express.json({ limit: '20mb' }));

// GET all products
app.get('/api/products', (_req, res) => {
  const rows = db.prepare('SELECT * FROM products ORDER BY createdAt DESC').all() as any[];
  const products = rows.map(row => ({
    ...row,
    features: row.features ? row.features.split('|||') : [],
    isBestSeller: !!row.isBestSeller,
    isFeatured: !!row.isFeatured,
  }));
  res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id) as any;
  if (!row) return res.status(404).json({ error: 'Product not found' });
  res.json({
    ...row,
    features: row.features ? row.features.split('|||') : [],
    isBestSeller: !!row.isBestSeller,
    isFeatured: !!row.isFeatured,
  });
});

// CREATE product
app.post('/api/products', (req, res) => {
  const { id, name, model, category, price, description, features, isBestSeller, isFeatured, imageData, imageFileName } = req.body;

  let imagePath = '';
  if (imageData && imageFileName) {
    const safeName = imageFileName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9.\-]/g, '');
    const uniqueName = `${id}-${safeName}`;
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(path.join(UPLOAD_DIR, uniqueName), Buffer.from(base64Data, 'base64'));
    imagePath = `/products/${uniqueName}`;
  }

  const featuresStr = Array.isArray(features) ? features.join('|||') : (features || '');

  db.prepare(`
    INSERT INTO products (id, name, model, category, price, image, description, features, isBestSeller, isFeatured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, model || '', category, price || 0, imagePath, description || '', featuresStr, isBestSeller ? 1 : 0, isFeatured ? 1 : 0);

  res.json({ success: true, id, image: imagePath });
});

// UPDATE product
app.put('/api/products/:id', (req, res) => {
  const { name, model, category, price, description, features, isBestSeller, isFeatured, imageData, imageFileName } = req.body;
  const { id } = req.params;

  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as any;
  if (!existing) return res.status(404).json({ error: 'Product not found' });

  let imagePath = existing.image;
  if (imageData && imageFileName) {
    // Delete old image if it exists
    if (existing.image) {
      const oldPath = path.join(__dirname, '..', 'public', existing.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    const safeName = imageFileName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9.\-]/g, '');
    const uniqueName = `${id}-${safeName}`;
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(path.join(UPLOAD_DIR, uniqueName), Buffer.from(base64Data, 'base64'));
    imagePath = `/products/${uniqueName}`;
  }

  const featuresStr = Array.isArray(features) ? features.join('|||') : (features || '');

  db.prepare(`
    UPDATE products SET name=?, model=?, category=?, price=?, image=?, description=?, features=?, isBestSeller=?, isFeatured=?, updatedAt=datetime('now')
    WHERE id=?
  `).run(name, model || '', category, price || 0, imagePath, description || '', featuresStr, isBestSeller ? 1 : 0, isFeatured ? 1 : 0, id);

  res.json({ success: true, image: imagePath });
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id) as any;
  if (!existing) return res.status(404).json({ error: 'Product not found' });

  if (existing.image) {
    const imgPath = path.join(__dirname, '..', 'public', existing.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// GET categories
app.get('/api/categories', (_req, res) => {
  const rows = db.prepare('SELECT DISTINCT category FROM products ORDER BY category').all() as any[];
  res.json(rows.map(r => r.category));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

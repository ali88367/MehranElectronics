import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const PRODUCTS_PATH = path.join(ROOT_DIR, 'src', 'data', 'products.json');

interface Product {
  id: string;
  name: string;
  model?: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  isBestSeller?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

function readProducts(): Product[] {
  if (!fs.existsSync(PRODUCTS_PATH)) return [];
  return JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'));
}

function writeProducts(products: Product[]) {
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2));
}

const app = express();
app.use(express.json({ limit: '50mb' }));

// Serve uploaded product images and other public assets
app.use(express.static(path.join(ROOT_DIR, 'public')));

// GET all products
app.get('/api/products', (_req, res) => {
  res.json(readProducts());
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const product = readProducts().find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// CREATE product
app.post('/api/products', (req, res) => {
  const { id, name, model, category, price, description, features, isBestSeller, isFeatured, imageData } = req.body;

  const now = new Date().toISOString();
  const product: Product = {
    id,
    name,
    model: model || '',
    category,
    price: price || 0,
    image: imageData || '',
    description: description || '',
    features: Array.isArray(features) ? features : [],
    isBestSeller: !!isBestSeller,
    isFeatured: !!isFeatured,
    createdAt: now,
    updatedAt: now,
  };

  const products = readProducts();
  products.unshift(product);
  writeProducts(products);

  res.json({ success: true, id, image: product.image });
});

// UPDATE product
app.put('/api/products/:id', (req, res) => {
  const { name, model, category, price, description, features, isBestSeller, isFeatured, imageData } = req.body;
  const { id } = req.params;

  const products = readProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const existing = products[index];
  const updated: Product = {
    ...existing,
    name,
    model: model || '',
    category,
    price: price || 0,
    description: description || '',
    features: Array.isArray(features) ? features : [],
    isBestSeller: !!isBestSeller,
    isFeatured: !!isFeatured,
    image: imageData || existing.image,
    updatedAt: new Date().toISOString(),
  };

  products[index] = updated;
  writeProducts(products);

  res.json({ success: true, image: updated.image });
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  products.splice(index, 1);
  writeProducts(products);

  res.json({ success: true });
});

// GET categories
app.get('/api/categories', (_req, res) => {
  const categories = [...new Set(readProducts().map(p => p.category))].sort();
  res.json(categories);
});

// Serve built React app in production (when dist/ exists)
const distDir = path.join(ROOT_DIR, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  // SPA fallback — serve index.html for any non-API route
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  if (fs.existsSync(distDir)) {
    console.log(`Serving built app from dist/`);
  }
});

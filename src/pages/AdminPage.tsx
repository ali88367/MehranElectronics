import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Save, ArrowLeft, Image as ImageIcon, Upload, Search, Edit3, X, Check, AlertCircle, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES, type Product } from '@/data/mock';

interface ProductForm {
  id: string;
  name: string;
  model: string;
  category: string;
  price: string;
  description: string;
  features: string;
  isBestSeller: boolean;
  isFeatured: boolean;
  imagePreview: string;
  imageData: string;
  imageFileName: string;
  existingImage: string;
}

function emptyForm(): ProductForm {
  return {
    id: crypto.randomUUID().slice(0, 8),
    name: '',
    model: '',
    category: CATEGORIES[0]?.name || '',
    price: '',
    description: '',
    features: '',
    isBestSeller: false,
    isFeatured: false,
    imagePreview: '',
    imageData: '',
    imageFileName: '',
    existingImage: '',
  };
}

function productToForm(p: Product): ProductForm {
  return {
    id: p.id,
    name: p.name,
    model: p.model || '',
    category: p.category,
    price: String(p.price),
    description: p.description,
    features: p.features.join(', '),
    isBestSeller: !!p.isBestSeller,
    isFeatured: !!p.isFeatured,
    imagePreview: p.image,
    imageData: '',
    imageFileName: '',
    existingImage: p.image,
  };
}

export function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ProductForm>(emptyForm());
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function showMessage(type: 'success' | 'error', text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const canvas = document.createElement('canvas');
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX = 1200;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        if (width > height) { height = Math.round((height * MAX) / width); width = MAX; }
        else { width = Math.round((width * MAX) / height); height = MAX; }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL('image/jpeg', 0.85);
      setForm(prev => ({
        ...prev,
        imageData: compressed,
        imagePreview: compressed,
        imageFileName: file.name.replace(/\.[^.]+$/, '.jpg'),
      }));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      showMessage('error', 'Failed to load image. Please try another file.');
    };

    img.src = objectUrl;
    e.target.value = '';
  }

  function resetForm() {
    setForm(emptyForm());
    setEditing(false);
  }

  function editProduct(product: Product) {
    setForm(productToForm(product));
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSave() {
    if (!form.name.trim()) { showMessage('error', 'Product name is required'); return; }
    if (!form.price.trim()) { showMessage('error', 'Price is required'); return; }
    if (!form.imagePreview && !form.existingImage) { showMessage('error', 'Please upload an image'); return; }

    setSaving(true);
    try {
      const body = {
        id: form.id,
        name: form.name.trim(),
        model: form.model.trim(),
        category: form.category,
        price: parseInt(form.price) || 0,
        description: form.description.trim(),
        features: form.features.split(',').map(f => f.trim()).filter(Boolean),
        isBestSeller: form.isBestSeller,
        isFeatured: form.isFeatured,
        imageData: form.imageData || undefined,
        imageFileName: form.imageFileName || undefined,
      };

      const url = editing ? `/api/products/${form.id}` : '/api/products';
      const method = editing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save');
      }

      showMessage('success', editing ? 'Product updated!' : 'Product added!');
      resetForm();
      await loadProducts();
    } catch (err: any) {
      showMessage('error', err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      showMessage('success', 'Product deleted');
      setDeleteConfirm(null);
      if (editing && form.id === id) resetForm();
      await loadProducts();
    } catch {
      showMessage('error', 'Failed to delete product');
    }
  }

  async function handleExport() {
    if (products.length === 0) { showMessage('error', 'No products to export'); return; }
    showMessage('success', 'Preparing export...');

    const productsWithBase64 = await Promise.all(
      products.map(async (p) => {
        let image = p.image;
        if (image && image.startsWith('/products/')) {
          try {
            const res = await fetch(image);
            const blob = await res.blob();
            image = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          } catch { /* keep original path if fetch fails */ }
        }
        return { ...p, image };
      })
    );

    const json = JSON.stringify(productsWithBase64, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    URL.revokeObjectURL(url);
    showMessage('success', `Exported ${products.length} products!`);
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.model || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-luxury-charcoal mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Website
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-luxury-charcoal mb-1">Product Manager</h1>
              <p className="text-gray-500">
                {products.length} product{products.length !== 1 ? 's' : ''} in database
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                disabled={products.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                title="Download products.json for Netlify deployment"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>
              <button
                onClick={() => { resetForm(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-luxury-charcoal text-white rounded-lg hover:bg-black transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Toast Message */}
        {message && (
          <div className={cn(
            'fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm font-medium animate-in slide-in-from-right',
            message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          )}>
            {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        {/* Product Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-luxury-charcoal">
              {editing ? `Edit: ${form.name || 'Product'}` : 'Add New Product'}
            </h2>
            {editing && (
              <button onClick={resetForm} className="text-sm text-gray-500 hover:text-luxury-charcoal flex items-center gap-1">
                <X className="w-4 h-4" /> Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-luxury-charcoal mb-3">Product Image *</label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {form.imagePreview ? (
                <div>
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <img src={form.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs text-luxury-charcoal underline hover:no-underline">
                      Change
                    </button>
                    <button
                      onClick={() => setForm(prev => ({ ...prev, imageData: '', imagePreview: '', imageFileName: '', existingImage: '' }))}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-[4/5] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-luxury-charcoal hover:bg-gray-50 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-luxury-charcoal/10 transition-colors">
                    <Upload className="w-7 h-7 text-gray-400 group-hover:text-luxury-charcoal transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Click to upload image</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG</p>
                  </div>
                </button>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-luxury-charcoal mb-2">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Haier DC Inverter 1.5 Ton"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-charcoal mb-2">Model Number</label>
                <input
                  type="text"
                  value={form.model}
                  onChange={(e) => setForm(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="e.g. HSU-12HFCF"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-charcoal mb-2">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal transition-all bg-white"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-charcoal mb-2">Price (PKR) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="e.g. 125000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-luxury-charcoal mb-2">
                  Features <span className="text-gray-400 font-normal">(comma separated)</span>
                </label>
                <textarea
                  value={form.features}
                  onChange={(e) => setForm(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="e.g. Inverter, 1.5 Ton, WiFi Control"
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal transition-all resize-y"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-luxury-charcoal mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Short description of the product..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal transition-all resize-none"
                />
              </div>

              <div className="md:col-span-2 flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isBestSeller}
                    onChange={(e) => setForm(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-300 text-luxury-charcoal focus:ring-luxury-charcoal"
                  />
                  <span className="text-sm text-gray-600">Best Seller</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-300 text-luxury-charcoal focus:ring-luxury-charcoal"
                  />
                  <span className="text-sm text-gray-600">Featured</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={cn(
                    'flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-sm font-medium transition-all w-full md:w-auto',
                    saving ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-luxury-charcoal text-white hover:bg-black'
                  )}
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : editing ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="font-serif text-xl text-luxury-charcoal">All Products</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal w-full sm:w-64"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-1">
                {products.length === 0 ? 'No products yet' : 'No products match your search'}
              </p>
              <p className="text-gray-300 text-sm">
                {products.length === 0 ? 'Click "Add Product" to get started' : 'Try a different search term or category'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs uppercase tracking-wider text-gray-500 font-medium pb-3 pr-4">Image</th>
                    <th className="text-left text-xs uppercase tracking-wider text-gray-500 font-medium pb-3 pr-4">Product</th>
                    <th className="text-left text-xs uppercase tracking-wider text-gray-500 font-medium pb-3 pr-4 hidden md:table-cell">Category</th>
                    <th className="text-left text-xs uppercase tracking-wider text-gray-500 font-medium pb-3 pr-4">Price</th>
                    <th className="text-right text-xs uppercase tracking-wider text-gray-500 font-medium pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          {product.image ? (
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-300" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="font-medium text-sm text-luxury-charcoal">{product.name}</p>
                        {product.model && <p className="text-xs text-gray-400 mt-0.5">{product.model}</p>}
                      </td>
                      <td className="py-3 pr-4 hidden md:table-cell">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{product.category}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm font-medium text-luxury-charcoal">
                          PKR {(product.price || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => editProduct(product)}
                            className="p-2 text-gray-400 hover:text-luxury-charcoal hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {deleteConfirm === product.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-50">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

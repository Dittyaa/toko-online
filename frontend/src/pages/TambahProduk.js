import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormProduk.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const TambahProduk = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (imageFile) data.append('image', imageFile);

      await axios.post(`${API_URL}/api/products`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/produk');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambah produk. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-produk-container">
      <div className="form-produk-card">
        <h2>➕ Tambah Produk Baru</h2>
        <p className="form-subtitle">Lengkapi data produk yang ingin Anda tambahkan</p>

        {error && <div className="alert alert-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="form-produk">
          <div className="form-group">
            <label>Nama Produk *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Sepatu Running Nike"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Harga (Rp) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="250000"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Stok</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="10"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Kategori *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Contoh: Sepatu, Elektronik, Pakaian"
              required
            />
          </div>

          <div className="form-group">
            <label>Deskripsi *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deskripsikan produk Anda dengan detail..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Gambar Produk</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/produk')} className="btn-cancel">
              Batal
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? '⏳ Menyimpan...' : '✅ Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahProduk;

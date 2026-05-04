import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormProduk.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const EditProduk = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        const p = res.data.data || res.data;
        setFormData({
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          stock: p.stock
        });
        if (p.image) setCurrentImage(`${API_URL}${p.image}`);
      } catch (err) {
        setError('Produk tidak ditemukan');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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

      await axios.put(`${API_URL}/api/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate(`/produk/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengupdate produk');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="loading-container">⏳ Memuat data produk...</div>;

  return (
    <div className="form-produk-container">
      <div className="form-produk-card">
        <h2>✏️ Edit Produk</h2>
        <p className="form-subtitle">Ubah data produk yang diperlukan</p>

        {error && <div className="alert alert-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="form-produk">
          <div className="form-group">
            <label>Nama Produk *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Harga (Rp) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" required />
            </div>
            <div className="form-group">
              <label>Stok</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" />
            </div>
          </div>

          <div className="form-group">
            <label>Kategori *</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Deskripsi *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
          </div>

          <div className="form-group">
            <label>Gambar Produk</label>
            {currentImage && !imagePreview && (
              <div className="image-preview current-image">
                <p className="image-label">Gambar saat ini:</p>
                <img src={currentImage} alt="Gambar saat ini" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
            {imagePreview && (
              <div className="image-preview">
                <p className="image-label">Gambar baru:</p>
                <img src={imagePreview} alt="Preview baru" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(`/produk/${id}`)} className="btn-cancel">
              Batal
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? '⏳ Menyimpan...' : '✅ Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduk;

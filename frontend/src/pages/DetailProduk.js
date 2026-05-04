import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './DetailProduk.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DetailProduk = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data.data || res.data);
      } catch (err) {
        setError('Produk tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Yakin ingin menghapus produk ini?')) return;
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      navigate('/produk');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus produk');
      setDeleting(false);
    }
  };

  const formatHarga = (harga) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(harga);
  };

  if (loading) return <div className="loading-container">⏳ Memuat produk...</div>;
  if (error) return (
    <div className="error-container">
      <p>{error}</p>
      <Link to="/produk" className="btn-back">← Kembali ke Produk</Link>
    </div>
  );

  return (
    <div className="detail-produk">
      <Link to="/produk" className="btn-back">← Kembali</Link>

      <div className="detail-card">
        <div className="detail-image">
          {product.image ? (
            <img src={`${API_URL}${product.image}`} alt={product.name} />
          ) : (
            <div className="detail-img-placeholder">🏷️</div>
          )}
        </div>

        <div className="detail-info">
          <span className="detail-kategori">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-harga">{formatHarga(product.price)}</p>
          
          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Stok</span>
              <span className={`meta-value ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
                {product.stock > 0 ? `${product.stock} tersedia` : 'Habis'}
              </span>
            </div>
          </div>

          <div className="detail-desc">
            <h3>Deskripsi Produk</h3>
            <p>{product.description}</p>
          </div>

          <div className="detail-tanggal">
            <small>Ditambahkan: {new Date(product.createdAt).toLocaleDateString('id-ID', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}</small>
          </div>

          {/* Tombol Edit & Hapus hanya untuk user yang login */}
          {isAuthenticated && (
            <div className="detail-actions">
              <Link to={`/edit-produk/${product._id}`} className="btn-edit">
                ✏️ Edit Produk
              </Link>
              <button
                onClick={handleDelete}
                className="btn-delete"
                disabled={deleting}
              >
                {deleting ? '⏳ Menghapus...' : '🗑️ Hapus Produk'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;

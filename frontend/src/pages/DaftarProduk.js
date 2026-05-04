import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DaftarProduk.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DaftarProduk = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data.data || res.data);
    } catch (err) {
      setError('Gagal memuat produk. Periksa koneksi Anda.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategori === '' || p.category.toLowerCase() === kategori.toLowerCase();
    return matchSearch && matchKategori;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  const formatHarga = (harga) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(harga);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">⏳ Memuat produk...</div>
      </div>
    );
  }

  return (
    <div className="daftar-produk">
      <div className="produk-header">
        <h1>🛍️ Daftar Produk</h1>
        <p>Temukan produk yang Anda cari</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="kategori-select"
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>Produk tidak ditemukan</h3>
          <p>{search || kategori ? 'Coba ubah filter pencarian Anda.' : 'Belum ada produk yang tersedia.'}</p>
        </div>
      ) : (
        <>
          <p className="hasil-count">Menampilkan {filteredProducts.length} produk</p>
          <div className="produk-grid">
            {filteredProducts.map((product) => (
              <Link to={`/produk/${product._id}`} key={product._id} className="produk-card">
                <div className="produk-img-container">
                  {product.image ? (
                    <img
                      src={`${API_URL}${product.image}`}
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="produk-img-placeholder" style={{ display: product.image ? 'none' : 'flex' }}>
                    🏷️
                  </div>
                </div>
                <div className="produk-info">
                  <span className="produk-kategori">{product.category}</span>
                  <h3 className="produk-name">{product.name}</h3>
                  <p className="produk-harga">{formatHarga(product.price)}</p>
                  <p className="produk-stok">Stok: {product.stock}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DaftarProduk;

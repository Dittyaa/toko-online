import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Beranda.css';

const Beranda = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="beranda">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🛒 Selamat Datang di<br />Toko Online</h1>
          <p>
            Temukan produk terbaik dengan harga terjangkau.<br />
            {isAuthenticated
              ? `Halo, ${user?.name}! Yuk mulai belanja.`
              : 'Login untuk mulai berbelanja dan kelola produk.'}
          </p>
          <div className="hero-buttons">
            <Link to="/produk" className="btn-primary">
              🛍️ Lihat Produk
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn-secondary">
                📝 Daftar Gratis
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/tambah-produk" className="btn-secondary">
                ➕ Tambah Produk
              </Link>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-emoji">🏪</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Mengapa Toko Online Kami?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Aman & Terpercaya</h3>
            <p>Transaksi aman dengan autentikasi JWT dan enkripsi data</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Produk Lengkap</h3>
            <p>Ribuan produk dari berbagai kategori tersedia</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Cepat & Mudah</h3>
            <p>Tambah, edit, dan kelola produk dengan mudah</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsif</h3>
            <p>Dapat diakses dari perangkat apapun kapanpun</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="cta">
          <h2>Siap Mulai?</h2>
          <p>Buat akun gratis dan mulai jual beli produk Anda hari ini!</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-primary">Daftar Sekarang</Link>
            <Link to="/login" className="btn-outline">Sudah Punya Akun</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Beranda;

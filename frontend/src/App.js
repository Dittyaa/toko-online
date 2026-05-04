import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Beranda from './pages/Beranda';
import DaftarProduk from './pages/DaftarProduk';
import DetailProduk from './pages/DetailProduk';
import TambahProduk from './pages/TambahProduk';
import EditProduk from './pages/EditProduk';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// ============================================================
// GOOGLE ANALYTICS - TRACKING HALAMAN
// Ganti GA_MEASUREMENT_ID di .env dengan ID dari Google Analytics
// ============================================================
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

// Komponen untuk track page views setiap navigasi
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnalyticsTracker />
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Beranda />} />
              <Route path="/produk" element={<DaftarProduk />} />
              <Route path="/produk/:id" element={<DetailProduk />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes - Butuh Login */}
              <Route
                path="/tambah-produk"
                element={
                  <PrivateRoute>
                    <TambahProduk />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-produk/:id"
                element={
                  <PrivateRoute>
                    <EditProduk />
                  </PrivateRoute>
                }
              />

              {/* 404 Not Found */}
              <Route
                path="*"
                element={
                  <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <h2>404 - Halaman Tidak Ditemukan</h2>
                    <p>Halaman yang Anda cari tidak ada.</p>
                    <a href="/" style={{ color: '#1a73e8' }}>Kembali ke Beranda</a>
                  </div>
                }
              />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2025 Toko Online | Dibuat dengan React + Node.js + MongoDB</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🛒 Toko Online
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Beranda</Link>
          <Link to="/produk" className="nav-link" onClick={() => setMenuOpen(false)}>Produk</Link>

          {isAuthenticated ? (
            <>
              <Link to="/tambah-produk" className="nav-link" onClick={() => setMenuOpen(false)}>
                + Tambah Produk
              </Link>
              <div className="nav-user">
                <span className="nav-username">👤 {user?.name}</span>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn-login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn-register" onClick={() => setMenuOpen(false)}>
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

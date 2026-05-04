# Toko Online - TP2 (Autentikasi, Deployment, Monitoring)

## Teknologi
- **Frontend**: React.js, React Router v6, Axios
- **Backend**: Node.js, Express.js, JWT, bcryptjs
- **Database**: MongoDB Atlas
- **Deployment**: Render (backend), Vercel (frontend)
- **Monitoring**: Google Analytics 4

---

## Struktur Proyek

```
toko-online/
├── backend/
│   ├── middleware/auth.js       # JWT middleware
│   ├── models/User.js           # Model User
│   ├── models/Product.js        # Model Produk
│   ├── routes/authRoutes.js     # Register, Login, Me
│   ├── routes/productRoutes.js  # CRUD Produk (protected)
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── context/AuthContext.js   # Global auth state (token di localStorage)
    │   ├── components/
    │   │   ├── Navbar.js            # Navbar responsif dengan auth state
    │   │   └── PrivateRoute.js      # Proteksi route
    │   ├── pages/
    │   │   ├── Beranda.js
    │   │   ├── DaftarProduk.js
    │   │   ├── DetailProduk.js
    │   │   ├── TambahProduk.js      # Protected
    │   │   ├── EditProduk.js        # Protected
    │   │   ├── Login.js
    │   │   └── Register.js
    │   ├── App.js                   # Routes + Google Analytics tracker
    │   └── index.js                 # GA script injection
    ├── .env.example
    ├── vercel.json
    └── package.json
```

---

## Cara Menjalankan Lokal

### 1. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: isi MONGO_URI dan JWT_SECRET
node server.js
```

### 2. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env: REACT_APP_API_URL=http://localhost:5000
npm start
```

---

## Deployment

### Backend ke Render
1. Push ke GitHub
2. Buka render.com → New Web Service
3. Connect repo, pilih folder `backend`
4. Build: `npm install` | Start: `node server.js`
5. Tambah Environment Variables: MONGO_URI, JWT_SECRET

### Frontend ke Vercel
1. Buka vercel.com → New Project
2. Connect repo, pilih folder `frontend`
3. Tambah Environment Variables:
   - `REACT_APP_API_URL` = URL Render backend
   - `REACT_APP_GA_MEASUREMENT_ID` = G-XXXXXXXXXX

---

## Google Analytics Setup
1. Buat akun di analytics.google.com
2. Buat Property baru → Web
3. Salin Measurement ID (format: G-XXXXXXXXXX)
4. Tambahkan ke `.env` frontend: `REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

---

## API Endpoints

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|------------|
| POST | /api/auth/register | Public | Registrasi user baru |
| POST | /api/auth/login | Public | Login, dapat token JWT |
| GET | /api/auth/me | Private | Data user login |
| GET | /api/products | Public | Semua produk |
| GET | /api/products/:id | Public | Detail produk |
| POST | /api/products | Private | Tambah produk |
| PUT | /api/products/:id | Private | Edit produk |
| DELETE | /api/products/:id | Private | Hapus produk |

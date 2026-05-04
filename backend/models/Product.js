const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama produk wajib diisi'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Deskripsi produk wajib diisi']
  },
  price: {
    type: Number,
    required: [true, 'Harga produk wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  category: {
    type: String,
    required: [true, 'Kategori produk wajib diisi'],
    trim: true
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stok tidak boleh negatif']
  },
  image: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);

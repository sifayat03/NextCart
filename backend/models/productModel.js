const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
  type: String,
  required: true,
  enum: [
    "Electronics",
    "Fashion",
    "Books",
    "Shoes"
  ]
},
  stock: { type: Number, required: true },
  imageUrl: { type: String, required: true },

  reviews: [
  {
    user: { type: mongoose.Schema.Types.ObjectId,  ref: "User", required: true },
    name: { type: String, required: true, },
    rating: { type: Number, required: true, min: 1, max: 5, },
    comment: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now, },
  },
],

averageRating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},
  imagePublicId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
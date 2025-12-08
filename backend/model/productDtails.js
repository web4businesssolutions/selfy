const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // ✅ Seller reference
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Step 1: Category
  category: { type: String, required: true },
  image: { type: String },
  brandName: { type: String },

  // Step 2: Description
  name: { type: String, required: true },
  description: { type: String },
  bulletPoints: [{ type: String }],
  images: [{ type: String }],

  // Step 3: Product Details
  manufacturer: { type: String },
  ageRange: { type: String },
  numberOfItems: { type: Number },
  itemTypeName: { type: String },
  color: { type: String },
  partNumber: { type: String },
  manufacturerContact: { type: String },
  isSensitive: { type: Boolean, default: false },
  isExpirable: { type: Boolean, default: false },
  unitCount: { type: Number },
  unitType: { type: String },
  width: { type: Number },
  height: { type: Number },
  length: { type: Number },
  weight: { type: Number },

  // Step 4: Offer
  quantity: { type: Number },
  price: { type: Number },
  maxPrice: { type: Number },
  retailPrice: { type: Number },
  itemCondition: { type: String },

  // Step 5: Compliance
  complianceInfo: { type: String }

}, {
  timestamps: true
});

module.exports = mongoose.model('ProductDetail', productSchema);

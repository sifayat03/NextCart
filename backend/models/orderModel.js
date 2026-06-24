const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
{
  orderNumber: {
    type: String,
    unique: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      name: String,

      image: String,

      qty: {
        type: Number,
        required: true
      },

      price: {
        type: Number,
        required: true
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  address: {
    fullName: String,
    street: String,
    city: String,
    postalCode: String,
    country: String
  },

  paymentId: String,

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },

  paymentMethod: {
  type: String,
  default: "Razorpay"
},
razorpayOrderId: String,

razorpayPaymentId: String,

  status: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ],
    default: "Pending"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);



const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingInfo: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    other: {
      type: String,
    },
  },
  orderStatus: {
    type: String,
    default: "Ordered",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalPriceAfterDiscount: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    default: new Date().getMonth(),
  },
  paymentInfo: {
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

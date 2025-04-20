const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    course: String,
    query: String,
    coupon: String,
    appliedCoupon: String,
    totalAmount: Number,
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

module.exports = mongoose.model("Checkout", checkoutSchema);

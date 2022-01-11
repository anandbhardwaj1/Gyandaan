const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
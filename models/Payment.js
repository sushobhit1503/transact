const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentMethodName: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  isCredit: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
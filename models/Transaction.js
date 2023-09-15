// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  ledger: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  credit: {
    type: Boolean,
    required: true,
  },
  creditPerson: {
    type: String,
  },
  lent: {
    type: Boolean,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

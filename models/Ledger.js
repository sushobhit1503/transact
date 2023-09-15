const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Ledger = mongoose.model('Ledger', ledgerSchema);

module.exports = Ledger;
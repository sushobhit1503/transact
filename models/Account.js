const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
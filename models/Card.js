const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card
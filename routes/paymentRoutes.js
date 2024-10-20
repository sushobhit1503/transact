// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Cards = require("../models/Card")

// GET all payment methods
router.get('/', async (req, res) => {
  try {
    const paymentMethods = await Payment.find();
    res.json(paymentMethods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all cards
router.get('/cards', async (req, res) => {
  try {
    const cards = await Cards.find();
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new payment method
router.post('/', async (req, res) => {
  try {
    const { paymentMethodName, account, isCredit } = req.body;
    const paymentMethod = new Payment({ paymentMethodName, account, isCredit });
    await paymentMethod.save();
    res.json(paymentMethod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET payment method by UID
router.get('/:payment_uid', async (req, res) => {
  try {
    const paymentMethod = await Payment.findOne({ _id: req.params.payment_uid });
    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }
    res.json(paymentMethod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET payment methods by credit
router.get('/credit/check', async (req, res) => {
  try {
    const paymentMethods = await Payment.find({ isCredit: true });
    res.json(paymentMethods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE payment method by UID
router.delete('/:payment_uid', async (req, res) => {
  try {
    await Payment.deleteOne({ _id: req.params.payment_uid });
    res.json({ message: 'Payment method deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes for other payment method operations as needed

module.exports = router;

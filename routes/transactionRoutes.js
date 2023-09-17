// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('transactions/all', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET transaction by ID
router.get('/:transc_id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transc_id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET transactions by account UID
router.get('/account/:account_uid', async (req, res) => {
  try {
    const transactions = await Transaction.find({ account: req.params.account_uid });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET transactions by ledger UID
router.get('/ledger/:ledger_uid', async (req, res) => {
  try {
    const transactions = await Transaction.find({ ledger: req.params.ledger_uid });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes for other transaction operations as needed

module.exports = router;

// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
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

router.get('/transaction/method/:account_uid/:method', async (req, res) => {
  const { account_uid, method } = req.params;
  try {
    const transactions = await Transaction.find({ account: account_uid, paymentMethod: method });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/transaction/method/ledger/:ledger_uid/:method', async (req, res) => {
  const { ledger_uid, method } = req.params;
  try {
    const transactions = await Transaction.find({ ledger: ledger_uid, paymentMethod: method });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/transaction/credited/:account_uid', async (req, res) => {
  const account_uid = req.params.account_uid;
  try {
    const transactions = await Transaction.find({ account: account_uid, isCredit: true });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/transaction/credited/ledger/:ledger_uid', async (req, res) => {
  const ledger_uid = req.params.ledger_uid;
  try {
    const transactions = await Transaction.find({ ledger: ledger_uid, isCredit: true });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/transaction/category/:category/:account_uid', async (req, res) => {
  const { category, account_uid } = req.params;
  try {
    const transactions = await Transaction.find({ account: account_uid, category: category });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/transaction/category/ledger/:category/:ledger_uid', async (req, res) => {
  const { category, ledger_uid } = req.params;
  try {
    const transactions = await Transaction.find({ ledger: ledger_uid, category: category });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/transaction/date/:date/:account_uid', async (req, res) => {
  const { date, account_uid } = req.params;
  try {
    const transactions = await Transaction.find({ account: account_uid, date: date });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/transaction/date/ledger/:date/:ledger_uid', async (req, res) => {
  const { date, ledger_uid } = req.params;
  try {
    const transactions = await Transaction.find({ ledger: ledger_uid, date: date });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/transaction/amount/:uid/:amount', async (req, res) => {
  const { uid, amount } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(_id, { $set: { amount: amount } }, { new: true });
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

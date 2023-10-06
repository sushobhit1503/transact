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

router.get('/method/:account_uid/:method', async (req, res) => {
  const { account_uid, method } = req.params;
  try {
    const transactions = await Transaction.find({ account: account_uid, paymentMethod: method });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/method/ledger/:ledger_uid/:method', async (req, res) => {
  const { ledger_uid, method } = req.params;
  try {
    const transactions = await Transaction.find({ ledger: ledger_uid, paymentMethod: method });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/credited/:account_uid', async (req, res) => {
  const account_uid = req.params.account_uid;
  try {
    const transactions = await Transaction.find({ account: account_uid, isCredit: true });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/credited/ledger/:ledger_uid', async (req, res) => {
  const ledger_uid = req.params.ledger_uid;
  try {
    const transactions = await Transaction.find({ ledger: ledger_uid, isCredit: true });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/category/:category/:account_uid', async (req, res) => {
  const { category, account_uid } = req.params;
  try {
    const transactions = await Transaction.find({ account: account_uid, category: category });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/category/ledger/:category/:ledger_uid', async (req, res) => {
  const { category, ledger_uid } = req.params;
  try {
    const transactions = await Transaction.find({ ledger: ledger_uid, category: category });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/date/:date/:account_uid', async (req, res) => {
  const { date, account_uid } = req.params;
  try {
    const transactions = await Transaction.find({ account: account_uid, date: date });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/date/ledger/:date/:ledger_uid', async (req, res) => {
  const { date, ledger_uid } = req.params;
  try {
    const transactions = await Transaction.find({ ledger: ledger_uid, date: date });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/amount/:_id/:amount', async (req, res) => {
  const { _id, amount } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(_id, { $set: { amount: amount } }, { new: true });
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { itemName, shopName, amount, ledger, account, paymentMethod, date, category, credit, creditPerson, lent } = req.body;
    const transaction = new Transaction({ itemName, shopName, amount, ledger, account, paymentMethod, date, category, credit, creditPerson, lent });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

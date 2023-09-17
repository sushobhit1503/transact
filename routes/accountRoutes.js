const express = require('express');
const router = express.Router();
const Account = require('../models/Account'); 

// GET account by ID
router.get('/:account_uid', async (req, res) => {
  try {
    const account = await Account.findOne({ uid: req.params.account_uid });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new account
router.post('/', async (req, res) => {
  try {
    const { bankName, accountType } = req.body;
    const account = new Account({ bankName, accountType });
    await account.save();
    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all accounts
router.get('accounts/all', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE account by ID
router.delete('/:account_uid', async (req, res) => {
  try {
    await Account.deleteOne({ uid: req.params.account_uid });
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
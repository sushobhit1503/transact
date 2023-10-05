const express = require('express');
const router = express.Router();
const Ledger = require('../models/Ledger'); 

router.get('/', async (req, res) => {
  try {
    const ledgers = await Ledger.find();
    res.json(ledgers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, purpose, account, active } = req.body;
    const ledger = new Ledger({ name, purpose, account, active });
    await ledger.save();
    res.json(ledger);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:uid', async (req, res) => {
  try {
    const ledger = await Ledger.findOne({ _id: req.params.uid });
    if (!ledger) {
      return res.status(404).json({ error: 'Ledger not found' });
    }
    res.json(ledger);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET ledgers by account UID
router.get('/account/:uid', async (req, res) => {
  try {
    const ledgers = await Ledger.find({ account: req.params.uid });
    res.json(ledgers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Activate ledger by UID
router.put('/activate/:uid', async (req, res) => {
  try {
    const ledger = await Ledger.findOneAndUpdate(
      { uid: req.params.uid },
      { $set: { active: true } }
    );
    if (!ledger) {
      return res.status(404).json({ error: 'Ledger not found' });
    }
    res.json(ledger);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Deactivate ledger by UID
router.put('/deactivate/:uid', async (req, res) => {
  try {
    const ledger = await Ledger.findOneAndUpdate(
      { uid: req.params.uid },
      { $set: { active: false } }
    );
    if (!ledger) {
      return res.status(404).json({ error: 'Ledger not found' });
    }
    res.json(ledger);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
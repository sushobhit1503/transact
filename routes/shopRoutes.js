const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop'); // Import the Shop model

// GET all shops
router.get('shops/all', async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET shop by UID
router.get('/:shop_uid', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shop_uid);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT: Change shop name by UID
router.put('/name/:shop_uid', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shop_uid);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    shop.name = req.body.name;
    await shop.save();
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT: Change shop city by UID
router.put('/city/:shop_uid', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shop_uid);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    shop.city = req.body.city;
    await shop.save();
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE shop by UID
router.delete('/:shop_uid', async (req, res) => {
  try {
    const shop = await Shop.findByIdAndRemove(req.params.shop_uid);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST: Create a new shop
router.post('/', async (req, res) => {
  try {
    const { name, city } = req.body;
    const shop = new Shop({ name, city });
    await shop.save();
    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
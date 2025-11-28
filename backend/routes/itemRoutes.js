// backend/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET /api/items  ?search=... ?category=...
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category.toLowerCase();
    if (search) filter.name = { $regex: search, $options: 'i' };
    const items = await Item.find(filter).sort({ name: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res) => {
  try {
    const it = await Item.findById(req.params.id);
    if (!it) return res.status(404).json({ message: 'Not found' });
    res.json(it);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/items  (admin/seed)
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// backend/routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// POST /api/requests
router.post('/', async (req, res) => {
  try {
    const r = new Request(req.body);
    await r.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/requests (admin)
router.get('/', async (req, res) => {
  const all = await Request.find().sort({ createdAt: -1 });
  res.json(all);
});

module.exports = router;

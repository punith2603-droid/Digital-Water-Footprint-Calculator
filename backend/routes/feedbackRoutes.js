// backend/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const fb = new Feedback(req.body);
    await fb.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET for admin checking
router.get('/', async (req, res) => {
  const all = await Feedback.find().sort({ createdAt: -1 });
  res.json(all);
});

module.exports = router;

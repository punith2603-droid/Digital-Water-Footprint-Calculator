// backend/models/Request.js
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  requesterName: { type: String },
  email: { type: String },
  itemName: { type: String, required: true },
  details: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);

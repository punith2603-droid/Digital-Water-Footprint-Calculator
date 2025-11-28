// backend/models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    water: { type: Number, default: 0 },
    unit: { type: String, default: "" },
    tips: { type: String, default: "" },
    calories: { type: Number, default: 0 },
    protein: { type: String, default: "" }, // string so you can store "2 g"
    vitamins: { type: String, default: "" },
    image: { type: String, default: "" } // e.g. "images/spinach.png"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);

const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  ticker: {
    type: String,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  open: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  mark: {
    type: Number,
    default: 0,
  },

  icon: {
    type: String,
    default: "",
  },
  logo: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    default: "open",
  },
  orientation: {
    type: String,
    required: true,
  },
  close: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Number,
    default: 0,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trade", tradeSchema);

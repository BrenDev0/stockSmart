const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
});

const watchlistSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tickers: [itemSchema],
});

module.exports = mongoose.model("watchlist", watchlistSchema);

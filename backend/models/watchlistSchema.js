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
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  tickers: [itemSchema],
});

module.exports = mongoose.model("watchlist", watchlistSchema);

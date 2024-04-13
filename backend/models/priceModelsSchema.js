const mongoose = require("mongoose");

const Data = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  tanBook: {
    type: Number,
    required: true,
  },
  roe: {
    type: Number,
    required: true,
  },
  roic: {
    type: Number,
    required: true,
  },
  dividend: {
    type: Number,
  },
});

const PriceModelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },

  data: [Data],
});

module.exports = mongoose.model("priceModel", PriceModelSchema);

const mongoose = require("mongoose");

const Data = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  }
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

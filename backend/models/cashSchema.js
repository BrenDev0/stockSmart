const mongoose = require("mongoose");

const cashSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cash", cashSchema);

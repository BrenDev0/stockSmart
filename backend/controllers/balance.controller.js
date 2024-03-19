const cashSchema = require("../models/cashSchema");

//get cash balance
const cashBalance = async (req, res) => {
  const balance = await cashSchema.find({ createdAt: -1 });
  res.status(200).json(balance);
};

module.exports = { cashBalance };

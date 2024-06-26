const tradeSchema = require("../models/tradeSchema");
const User = require("../models/userSchema");

//get positions
const positions = async (req, res) => {
  const positions = await tradeSchema
    .find({
      user: req.user,
      status: "open",
    })
    .sort({ ticker: 1 });

  res.status(200).json(positions);
};

//get all trades
const allTrades = async (req, res) => {
  const trades = await tradeSchema
    .find({
      user: req.user,
    })
    .sort({ createdAt: -1 });
  res.status(200).json(trades);
};

//get a single trade
const getTrade = async (req, res) => {
  const { id } = req.params;
  const trade = await tradeSchema.findById(id);
  res.status(200).json({ trade });
};

// open a new trade
const newTrade = async (req, res) => {
  const { ticker, shares, open, orientation, cost, mark, icon, logo } =
    req.body;

  const user = await User.findById(req.user);

  const trade = tradeSchema({
    user,
    ticker,
    shares,
    open,
    orientation,
    cost,
    mark,
    icon,
    logo,
  });
  try {
    if (!user || !ticker || !shares || !open || !orientation) {
      return res.status(400).json({ message: "ALL FIELDS REQUIRED" });
    }
    await trade.save();
    return res.status(200).json({ message: "Trade added" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update a trade
const updateTrade = async (req, res) => {
  try {
    const { id } = req.params;
    await tradeSchema.findByIdAndUpdate(id, req.body);
    if (!tradeSchema) {
      res.status(404).json({ message: "Trade Not Found" });
    }
    const updatedTrade = await tradeSchema.findById(id);
    res.status(200).json(updatedTrade);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//delete a trade
const deleteTrade = async (req, res) => {
  try {
    const { id } = req.params;
    await tradeSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Trade Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  allTrades,
  newTrade,
  getTrade,
  updateTrade,
  deleteTrade,
  positions,
};

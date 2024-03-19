const tradeSchema = require("../models/tradeSchema");

//get positions
const positions = async (req, res) => {
  const positions = await tradeSchema
    .aggregate([
      {
        $match: {
          status: "open",
        },
      },
    ])
    .sort({ ticker: 1 });

  res.status(200).json(positions);
};

//get all trades
const allTrades = async (req, res) => {
  const trades = await tradeSchema.find().sort({ createdAt: -1 });
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
  const { ticker, shares, open, orientation } = req.body;
  const cost = shares * open;
  const trade = tradeSchema({
    ticker,
    shares,
    open,
    orientation,
    cost,
  });
  try {
    if (!ticker || !shares || !open || !orientation) {
      res.status(400).json({ message: "ALL FIELDS REQUIRED" });
    }
    await trade.save();
    res.status(200).json({ message: "Trade added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

//delete a trade
const deleteTrade = async (req, res) => {
  try {
    const { id } = req.params;
    await tradeSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Trade Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

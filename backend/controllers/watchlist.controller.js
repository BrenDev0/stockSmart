const Watchlist = require("../models/watchlistSchema");

//get all watchlists
const getWatchlists = async (req, res) => {
  const watchlists = await Watchlist.aggregate([
    {
      $match: {
        category: "watchlist",
      },
    },
  ]).sort({ name: 1 });
  res.status(200).json(watchlists);
};

//get a single watchlist
const findWatchlist = async (req, res) => {
  const { id } = req.params;
  const watchlist = await Watchlist.findById(id);
  res.status(200).json(watchlist);
};

// create a watchlist
const newWatchlist = async (req, res) => {
  const { category, name } = req.body;
  const watchlist = Watchlist({
    category,
    name,
  });
  try {
    if (!category || !name) {
      res.status(400).json({ message: "All Fields Required" });
    }
    await watchlist.save();
    res.status(200).json({ message: "Watchlist Added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add to a watchlist
const addToWatchlist = async (req, res) => {
  try {
    const { ticker, mark } = req.body;
    const { id } = req.params;

    await Watchlist.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          tickers: { ticker: ticker, mark: mark },
        },
      }
    ).sort({ _id: 1 });
    res.status(200).json({ message: "added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//remove an item from a watchlist
const removeFromWatchlist = async (req, res) => {
  try {
    const { id } = req.params;
    await Watchlist.findByIdAndUpdate(id, {
      $pull: {
        tickers: { _id: req.body._id },
      },
    });

    res.status(200).json({ message: "Symbol Removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWatchlists,
  newWatchlist,
  findWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};

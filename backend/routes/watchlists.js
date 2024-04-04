const router = require("express").Router();
const verifyUser = require("../middleware/authMiddleware");
const {
  getWatchlists,
  newWatchlist,
  findWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} = require("../controllers/watchlist.controller");

//middleware

router
  .get("/get-watchlists", getWatchlists)
  .get("/find-watchlist/:id", findWatchlist)
  .post("/add-watchlist", newWatchlist)
  .put("/add-to-watchlist/:id", addToWatchlist)
  .put("/remove-from-watchlist/:id", removeFromWatchlist);

module.exports = router;

const router = require("express").Router();
const {
  allTrades,
  newTrade,
  getTrade,
  updateTrade,
  deleteTrade,
  positions,
} = require("../controllers/trade.controller");
const verifyUser = require("../middleware/authMiddleware");

//middleware

router
  .use(verifyUser)
  .get("/get-positions", positions)
  .get("/get-trades", allTrades)
  .get("/get-trade/:id", getTrade)
  .post("/new-trade", newTrade)
  .put("/update-trade/:id", updateTrade)
  .delete("/delete-trade/:id", deleteTrade);

module.exports = router;

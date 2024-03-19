const { cashBalance } = require("../controllers/balance.controller");

const router = require("express").Router();

//cash balances
router.get("/cash-balance", cashBalance);

module.exports = router;

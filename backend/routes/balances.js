const { cashBalance } = require("../controllers/balance.controller");
const verifyUser = require("../middleware/authMiddleware");

const router = require("express").Router();

//middleware

//cash balances
router.get("/cash-balance", cashBalance);

module.exports = router;

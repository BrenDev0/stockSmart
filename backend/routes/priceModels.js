const router = require("express").Router();
const { newModel, findModel } = require("../controllers/PriceModel.controller");
const verifyUser = require("../middleware/authMiddleware");

router.use(verifyUser);
router.post("/new-price-model", newModel);
router.get("/find-model/:id", findModel);

module.exports = router;

const router = require("express").Router();
const {
  newModel,
  findModel,
  getPricingModels,
  deleteModel,
  updateModel,
} = require("../controllers/PriceModel.controller");
const verifyUser = require("../middleware/authMiddleware");

router.use(verifyUser);
router.post("/new-price-model", newModel);
router.get("/find-model/:id", findModel);
router.get("/get-pricing-models", getPricingModels);
router.delete("/delete-model/:id", deleteModel);
router.put("/update-model/:id", updateModel);

module.exports = router;

const PriceModel = require("../models/priceModelsSchema");
const User = require("../models/userSchema");
// create a pricing model

const newModel = async (req, res) => {
  try {
    const { name, data } = req.body;
    const user = await User.findById(req.user);
    const model = PriceModel({
      user,
      name,
      data,
    });
    if (!user || !name || !data) {
      return res.status(400).json({ message: "More Data Required" });
    }

    await model.save();

    return res.status(200).json({ message: "New Model created" });
  } catch (error) {
    console.error(error);
  }
};

// get a single model

const findModel = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await PriceModel.findById(id);
    return res.status(200).json({ message: { model } });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { newModel, findModel };

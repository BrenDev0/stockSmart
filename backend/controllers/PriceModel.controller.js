const PriceModel = require("../models/priceModelsSchema");
const User = require("../models/userSchema");

//get all pricing models

const getPricingModels = async (req, res) => {
  const models = await PriceModel.find({
    user: req.user,
  }).sort({ createdAt: -1 });

  res.status(200).json(models);
};

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
    const model = await PriceModel.findOne({
      _id: id,
      user: req.user,
    });
    return res.status(200).json({ message: { model } });
  } catch (error) {
    console.error(error);
  }
};

//update a model
const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await PriceModel.findOneAndUpdate(
      {
        _id: id,
        user: req.user,
      },
      req.body
    );
    return res.status(200).json(model);
  } catch (error) {
    console.error(error);
  }
};

// delete a model

const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    await PriceModel.findOneAndDelete({
      _id: id,
      user: req.user,
    });
    res.status(200).json({ message: "Model Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  newModel,
  findModel,
  getPricingModels,
  deleteModel,
  updateModel,
};

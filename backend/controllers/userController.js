const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

//create token

const createToken = (_id) => {};

//login
const userLogin = async (req, res) => {
  const { email, passWord } = req.body;
};

//signup

const userSignup = async (req, res) => {};

module.exports = { userLogin, userSignup };

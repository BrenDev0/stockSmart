const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//statics signup

UserSchema.statics.signup = async function (email, password) {
  //validations
  if (!email || !password) {
    throw Error("All feilds required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Enter a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Enter a stronger password");
  }

  //check if registered
  const exists = this.findOne({ email });
  if (exists) {
    throw Error("Email is already in use");
  }

  //create user
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
  });

  return user;
};

//login

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields required");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);

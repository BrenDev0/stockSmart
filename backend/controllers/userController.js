const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

//create token

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

//login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields required" });
    }

    const user = User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Incorrect email or password" });
    }

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      res.status(400).json({ messaage: "Incorrect email or password" });
    }

    const token = createToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: false,
        withCredentials: true,
      })
      .send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup

const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields required" });
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({ message: "Please enter a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
      res.status(400).json({ message: "Password not strong enough" });
    }

    const exists = User.findOne({ email });

    if (exists) {
      res.status(400).json({ message: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hash });

    const token = createToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: false,
        withCredentials: true,
      })
      .send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// log out

const logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: false,
      expiresIn: new Date(0),
    })
    .send();
};

//allow access

const allowAccess = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.json(false);
    }

    jwt.verify(token, process.env.SECRET);
    res.send(true);
  } catch (error) {
    res.json(false);
  }
};

module.exports = { userLogin, userSignup, logout, allowAccess };

const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

//create token

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2h" });
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
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 2 * 60 * 60 * 1000,
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
        httpOnly: true,
        secrue: true,
        sameSite: "None",
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "User sign up successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// log out

const logOut = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.token) {
    return res.sendStatus(204);
  }

  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });

  res.json({ message: "Cookie cleared" });
};

//allow access

const allowAccess = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.json({ status: false, message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET, async (err, data) => {
      if (err) {
        return res.json({ status: false, message: "Unauthorized" });
      } else {
        const user = await User.findById(data._id);
        if (user) {
          return res.json({ status: true, user: user._id });
        } else {
          return res.json({ status: false, message: "Unauthorized" });
        }
      }
    });
  } catch (error) {
    res.json(false);
  }
};

module.exports = { userLogin, userSignup, logOut, allowAccess };

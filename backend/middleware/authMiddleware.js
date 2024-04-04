const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

//allow access

const verifyUser = async (req, res, next) => {
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
          return res.json({ status: true, user: user._id }), next();
        } else {
          return res.json({ status: false, message: "Unauthorized" });
        }
      }
    });
  } catch (error) {
    res.json(false);
  }
};

module.exports = verifyUser;

const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

//allow access

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: err });
    req.user = decoded._id;

    next();
  });
};

module.exports = verifyUser;

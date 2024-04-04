const router = require("express").Router();

const {
  userLogin,
  userSignup,
  logOut,
  verifyAuth,
} = require("../controllers/userController");

//log in
router.post("/login", userLogin);

//sign up
router.post("/signup", userSignup);

//log out
router.get("/logout", logOut);

//access
router.get("/", verifyAuth);
module.exports = router;

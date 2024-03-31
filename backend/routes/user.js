const router = require("express").Router();
const {
  userLogin,
  userSignup,
  logout,
  allowAccess,
} = require("../controllers/userController");

//log in
router.post("/login", userLogin);

//sign up
router.post("/signup", userSignup);

//log out
router.get("/logout", logout);

//access
router.get("/", allowAccess);
module.exports = router;

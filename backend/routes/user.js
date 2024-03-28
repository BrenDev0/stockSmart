const router = require("express").Router();
const { userLogin, userSignup } = require("../controllers/userController");

router.post("/login", userLogin).post("/signup", userSignup);

module.exports = router;

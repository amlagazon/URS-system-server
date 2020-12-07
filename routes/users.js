var express = require("express");
var router = express.Router();
const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleware");

/* GET users listing. */
router.get("/", controller.getall);

router.get("/:id", controller.getOne);

router.post(
  "/auth/signup",
  verifySignUp.checkDuplicateUsernameOrEmail,
  controller.signup
);

router.post("/auth/signin", verifySignUp.checkSignin, controller.signin);

module.exports = router;

const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log("checkDuplicateUsernameOrEmail");

  // Email
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  }).then((user) => {
    console.log("email check");
    console.log(user);
    if (user) {
      console.log("Email is already in use!");
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }
    next();
  });
  console.log("end check duplicate");
};

checkSignin = (req, res, next) => {
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkSignin: checkSignin,
};

module.exports = verifySignUp;

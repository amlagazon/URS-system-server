const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getall = (req, res) => {
  User.findAll()
    .then((users) => {
      res.send({ success: true, users });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.signup = (req, res) => {
  // Save User to Database
  console.log("SIGNUP");
  console.log(req.body);
  User.create({
    username: req.body.user.username,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 8),
  })
    .then((user) => {
      console.log(user);
      res.send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      console.log("error - " + err);
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  console.log("signin");
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then((user) => {
      console.log("hello");
      console.log(user);

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log("passswooord");

      console.log(req.body.user.password);
      console.log(user.password);
      var passwordIsValid = bcrypt.compareSync(
        req.body.user.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("hatdog");
      res.status(500).send({ message: err.message });
    });
};

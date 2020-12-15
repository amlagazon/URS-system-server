const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const UserType = db.userType;
const Student = db.student;
const Evaluator = db.evaluator;
const ProgramCourse = db.programCourse;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getall = (req, res) => {
  var join = [{ model: Student }, { model: UserType }, { model: Evaluator }];
  if (req.query.type != undefined) {
    join.push({ model: UserType, where: { type: req.query.type } });
  }
  User.findAll({
    include: join,
  })
    .then((users) => {
      if (req.query.program_id != undefined) {
        users = users.filter((user) => {
          switch (user.user_type.type) {
            case "student":
              return user.student.program_id == req.query.program_id;
            case "evaluator":
              return user.evaluator.program_id == req.query.program_id;
          }
        });
      }
      res.send({ success: true, users });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  var join = [{ model: Student }, { model: UserType }, { model: Evaluator }];
  let payload = req.body.user;
  console.log(req.body);
  if (!payload)
    res.status(400).send({
      message: "Failed! No payload found!",
    });
  User.findOne({ where: { id: req.params.id }, include: join }).then((user) => {
    if (user) {
      user.update(payload).then((user) => {
        if (payload.extras) {
          switch (user.user_type.type) {
            case "student":
              user.student.update(payload.extras).then((student) => {
                res.send({
                  success: true,
                  message: "Student was modified!",
                  user,
                });
              });
              break;
            case "evaluator":
              user.evaluator.update(payload.extras).then((evaluator) => {
                res.send({
                  success: true,
                  message: "Evaluator was modified!",
                  user,
                });
              });
              break;
          }
        }
      });
    } else {
      res.status(400).send({
        message: "Failed! User not found!",
      });
    }
  });
};

exports.getOne = (req, res) => {
  var join = [{ model: Student }, { model: UserType }, { model: Evaluator }];
  User.findOne({ where: { id: req.params.id }, include: join })
    .then((user) => {
      res.send({ success: true, user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signup = (req, res) => {
  // Save User to Database
  UserType.findOne({ type: "student" }).then((userType) => {
    if (!userType)
      return res.status(404).send({ message: "Student user type not found" });
    ProgramCourse.findOne({
      where: { name: req.body.user.program_course },
    }).then((programCourse) => {
      if (!programCourse)
        return res.status(404).send({ message: "Program course not found" });
      User.create(
        {
          first_name: req.body.user.first_name,
          last_name: req.body.user.last_name,
          email: req.body.user.email,
          password: bcrypt.hashSync(req.body.user.password, 8),
          user_type_id: userType.id,
          student: { gwa: 0, program_course_id: programCourse.id },
        },
        { include: { model: Student, as: "student" } }
      )
        .then((user) => {
          console.log(user);
          res.send({ message: "User was registered successfully!" });
        })
        .catch((err) => {
          console.log("error - " + err);
          res.status(500).send({ message: err.message });
        });
    });
  });
};
exports.signout = (req, res) => {
  // jwt.sign({ id: user.id }, config.secret);
  global.io.sockets.emit("signout");
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
    include: [{ model: Student }, { model: UserType }],
  })
    .then((user) => {
      console.log("hello");
      console.log(user);

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

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
        user,
      });

      global.io.sockets.emit("login", {
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteOne = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((success) => {
      if (success) {
        res.send({ success: true });
      } else {
        res.status(400).send({ message: "Failed to destroy user" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

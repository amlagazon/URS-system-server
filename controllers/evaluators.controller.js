const db = require("../models");
const config = require("../config/auth.config");
const Student = db.student;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.approveProfile = (req, res) => {
  Student.update(
    { status: "approved" },
    { where: { id: req.params.student_id } }
  )
    .then((success) => {
      console.log('adasd' + success)
      if (!!success[0]) {
        res.send({ success: true });
      } else {
        res.status(400).send({
          message: "Failed! Update failed.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.rejectProfile = (req, res) => {
  Student.update(
    { status: "rejected" },
    { where: { id: req.params.student_id } }
  )
    .then((success) => {
      if (!!success[0]) {
        res.send({ success: true });
      } else {
        res.status(400).send({
          message: "Failed! Update failed.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.approveSubjects = (req, res) => {
  Student.update(
    { subject_status: "approved" },
    { where: { id: req.params.student_id } }
  )
    .then((success) => {
      if (!!success[0]) {
        res.send({ success: true });
        global.io.emit("update_student_attr", {
          attr: "subject_status",
          value: "approved"
        })
      } else {
        res.status(400).send({
          message: "Failed! Update failed.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.rejectSubjects = (req, res) => {
  Student.update(
    { subject_status: "rejected" },
    { where: { id: req.params.student_id } }
  )
    .then((success) => {
      if (!!success[0]) {
        res.send({ success: true });
        global.io.emit("update_student_attr", {
          attr: "subject_status",
          value: "rejected"
        })
      } else {
        res.status(400).send({
          message: "Failed! Update failed",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

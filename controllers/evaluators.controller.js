const db = require("../models");
const config = require("../config/auth.config");
const Student = db.student;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.approveProfile = (req, res) => {
  Student.findOne({ where: { id: req.params.student_id } })
    .then((student) => {
      if(student){
        student.update({ status: "approved"})
        res.send({ success: true, student });
      } else{
        res.status(400).send({
          message: "Failed! Student not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.rejectProfile = (req, res) => {
  Student.findOne({ where: { id: req.params.student_id } })
    .then((student) => {
      if(student){
        student.update({ status: "rejected"})
        res.send({ success: true, student });
      } else{
        res.status(400).send({
          message: "Failed! Student not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.approveSubjects = (req, res) => {
  Student.findOne({ where: { id: req.params.student_id } })
    .then((student) => {
      if(student){
        student.update({ subject_status: "approved"})
        res.send({ success: true, student });
      } else{
        res.status(400).send({
          message: "Failed! Student not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.rejectSubjects = (req, res) => {
  Student.findOne({ where: { id: req.params.student_id } })
    .then((student) => {
      if(student){
        student.update({ subject_status: "rejected"})
        res.send({ success: true, student });
      } else{
        res.status(400).send({
          message: "Failed! Student not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

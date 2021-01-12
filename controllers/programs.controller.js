const db = require("../models");
const config = require("../config/auth.config");
const Program = db.program;
const UserType = db.userType;
const Semester = db.semester;
const Sequalize = db.Sequelize;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const e = require("express");

exports.getall = (req, res) => {
  Program.findAll({ include: { model: Semester } })
    .then((programs) => {
      res.send({ success: true, programs });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getOne = (req, res) => {
  Program.findOne({
    where: { id: req.params.id },
    include: { model: Semester },
  })
    .then((program) => {
      if (program) {
        res.send({ success: true, program });
      } else {
        res.status(400).send({
          message: "Failed! Program not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateOne = (req, res) => {
  console.log("hey!" + JSON.stringify(req.body));
  Program.update(
    {
      school_name: req.body.school_name,
      college: req.body.college,
    },
    { where: { id: req.params.id } }
  )
    .then(function (success) {
      if (!!success[0]) {
        res.send({ success: true });
      } else {
        res.status(400).send({
          message: "Failed to update program",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getSemesters = (req, res) => {
  Program.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Semester,
        where: { semesterId: Sequalize.col("semester.id") },
      },
    ],
  })
    .then((program) => {
      res.send({ success: true, program });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateSemester = (req, res) => {
  Program.update(
    {
      semester_id: req.body.semester_id,
    },
    { where: { id: req.params.id } }
  )
    .then((success) => {
      if (!!success[0]) {
        res.status(200).send({ success: true });
      } else {
        res.status(400).send({ message: "Update failed" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

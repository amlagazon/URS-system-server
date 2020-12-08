const db = require("../models");
const config = require("../config/auth.config");
const Program = db.program;
const UserType = db.userType;
const Semester = db.semester;
const Sequalize = db.Sequelize;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getall = (req, res) => {
  Program.findAll()
    .then((programs) => {
      res.send({ success: true, programs });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getOne = (req, res) => {
  Program.findOne({ where: { id: req.params.id } })
    .then((program) => {
      if(program){
        res.send({ success: true, program });
      } else{
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
    .then(function (rowsUpdated) {
      if (rowsUpdated[0] != 0){
        res.send({ success: true });
      } else{
        res.status(400).send({
          message: "Failed to update program",
        });
      }
      
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Foo.findAll({
//   include: [{
//       model: Bar,
//       required: true,
//       through: {
//               where: {
//                   BarId: {[Sequelize.Op.eq]: wineBar.id }
//               }
//           }
//       }
//   ]
// });

exports.getSemesters = (req, res) => {
  console.log(Sequalize.col('semester_id'))
  Program.findOne({
    where: { id: req.params.id },
    include: [{
      model: Semester,
      where: { semesterId: Sequalize.col('semester.id') }
    }]
  })
    .then((program) => {
      res.send({ success: true, program });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

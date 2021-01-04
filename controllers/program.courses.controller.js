const db = require("../models");
const ProgramCourse = db.programCourse;

exports.getall = (req, res) => {
  ProgramCourse.findAll().then((programCourses) =>
    res.send({ success: true, programCourses })
  );
};
exports.getOne = (req, res) => {
  ProgramCourse.findOne({
    where: { id: req.params.program_id },
  }).then((programCourse) => res.send({ success: true, programCourse }));
};

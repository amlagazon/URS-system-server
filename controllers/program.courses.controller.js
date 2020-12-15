const db = require("../models");
const ProgramCourse = db.programCourse;

exports.getall = (req, res) => {
  ProgramCourse.findAll().then((programCourses) =>
    res.send({ success: true, programCourses })
  );
};

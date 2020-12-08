const db = require("../models");
const Subject = db.subject;
const Program = db.program;
const ProgramCourse = db.programCourse;

exports.getall = (req, res) => {
  let where = {};
  if (req.query.semester) {
    where.semester = req.query.semester;
  }
  if (req.query.year_level) {
    where.year_level = req.query.year_level;
  }
  if (req.query.program_course) {
    ProgramCourse.findOne({
      where: { name: req.query.program_course },
      include: {
        model: Subject,
        as: "subjects",
        required: false,
        through: { attributes: [] },
        where,
      },
    }).then((programCourse) => {
      res.send({ success: true, subjects: programCourse.subjects });
    });
  } else {
    Subject.findAll({
      where,
    }).then((subjects) => res.send({ success: true, subjects }));
  }
};

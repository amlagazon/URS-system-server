const db = require("./../models");
const Semester = db.semester;

function initializeSemesters() {
  Semester.create({
    school_year: '2020-2021',
    semester: 1
  });
  Semester.create({
    school_year: '2020-2021',
    semester: 2
  });
}

module.exports.initializeSemesters = initializeSemesters;

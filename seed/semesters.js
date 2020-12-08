const db = require("./../models");
const Semester = db.semester;

function seed() {
  Semester.create({
    school_year: "2020-2021",
    semester: 1,
  });
}

module.exports.seed = seed;

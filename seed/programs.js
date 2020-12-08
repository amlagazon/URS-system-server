const db = require("./../models");
const Program = db.program;
const Semester = db.semester;
function seed() {
  Program.create({
    school_name: "University of Rizal",
    college: "College of Engineering",
    semester_id: 1,
  });
  Program.create({
    school_name: "University of Rizal",
    college: "College of Nursing",
    semester_id: 1,
  });
  Program.create({
    school_name: "University of Rizal",
    college: "College of Medicine",
    semester_id: 2,
  });
}

module.exports.seed = seed;

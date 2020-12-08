const db = require("./../models");
const Program = db.program;
function seed() {
  Program.create({
    school_name: "University of Rizal",
    college: "College of Engineering",
    semester_id: 1
  });
}

module.exports.seed = seed;

const userTypes = require("./user_types.js");
const users = require("./users.js");
const programs = require("./programs.js");
const semesters = require("./semesters.js");
const programCourseSubjects = require("./program_course_subjects.js");

function seed() {
  userTypes.seed();
  semesters.seed();
  programs.seed();
  users.seed();
  programCourseSubjects.seed();
}

module.exports.seed = seed;

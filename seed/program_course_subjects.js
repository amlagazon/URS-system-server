const db = require("../models");
const yaml = require("js-yaml");
const fs = require("fs");
const Subject = db.subject;
const ProgramCourse = db.programCourse;
async function seed() {
  try {
    initializeProgramCourses();
    initializeSubjects();
  } catch (error) {
    console.error(error);
  }

}
async function initializeProgramCourses() {
  try {
    let data = fs.readFileSync("./seed/data/program_courses.yaml", "utf8");
    let data_loaded = yaml.safeLoad(data);
    for (var key in data_loaded) {
      ProgramCourse.create({
        name: key,
        display_name: data_loaded[key].display_name,
      });
    }
  } catch (error) {
    console.error(error);
  }

}
async function initializeSubjects() {
  try {
    let data = fs.readFileSync("./seed/data/subjects.yaml", "utf8");
    let data_loaded = yaml.safeLoad(data);
    data_loaded.map((data) => {
      Subject.create({
        year_level: data.year_level,
        semester: data.semester,
        display_name: data.display_name,
        code: data.code,
        units: data.units,
      }).then((subject) => {
        addProgramCourseSubjects(data.program_courses, subject.id);
      }).catch((err) => {
        console.log(">> Error while adding Subjects", err.parent.sqlMessage);
      });
    });
  } catch (error) {
    console.error(error);
  }

}
function addProgramCourseSubjects(programCourseNames, subjectId) {
  return ProgramCourse.findAll({ where: { name: programCourseNames } })
    .then((programCourses) => {
      if (programCourses.size == 0) return null;
      return Subject.findByPk(subjectId).then((subject) => {
        if (!subject) return null;
        programCourses.map((programCourse) => {
          programCourse.addSubjects(subject);
          return subject;
        });
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Subject to ProgramCourse: ", err);
    });
}

module.exports.seed = seed;

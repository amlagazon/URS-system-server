const { student, studentSubject } = require("../models");
const db = require("../models");
const Subject = db.subject;
const StudentSubject = db.studentSubject;
const Student = db.student;
const ProgramCourse = db.programCourse;
const Sequelize = require("sequelize");
const subjects = require("../models/subjects");
function getAll(req, res, where, takenSubjects) {
  if (req.query.program_course) {
    ProgramCourse.findOne({
      where: Sequelize.or(
        { name: req.query.program_course },
        { id: req.query.program_course }
      ),
      include: {
        model: Subject,
        as: "subjects",
        required: false,
        through: { attributes: [] },
        where,
      },
    }).then((programCourse) => {
      res.send({
        success: true,
        subjects: filterByTakenSubjects(programCourse.subjects, takenSubjects),
      });
    });
  } else {
    Subject.findAll({
      where,
    }).then((subjects) => {
      res.send({
        success: true,
        subjects: filterByTakenSubjects(subjects, takenSubjects),
      });
    });
  }
}

function filterByTakenSubjects(subjects, takenSubjects) {
  if (takenSubjects.lenght == 0) return subjects;
  return subjects.filter((subject) => !takenSubjects.includes(subject.code));
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

exports.getall = (req, res) => {
  let where = {};
  if (req.query.semester) {
    where.semester = req.query.semester;
  }
  if (req.query.year_level) {
    where.year_level = req.query.year_level;
  }
  if (req.query.student_id) {
    Student.findOne({
      where: { id: req.query.student_id },
      include: { model: StudentSubject, include: { model: Subject } },
    }).then((student) => {
      if (!student)
        return res.status(404).send({ message: "Student not found" });
      var takenSubjects = [];
      student.student_subjects.map((studentSubject) => {
        takenSubjects.push(studentSubject.subject.code);
      });
      getAll(req, res, where, takenSubjects);
    });
  } else {
    getAll(req, res, where, []);
  }
};

exports.create = (req, res) => {
  console.log("Creating subject");
  console.log(req.body);
  Subject.findAll({ where: { code: req.body.code } }).then((subjects) => {
    if (subjects.length > 0) {
      console.log(subjects);
      res.status(404).send({ message: "Subect code already exists" });
      return;
    } else {
      Subject.create(req.body)
        .then((subject) => {
          addProgramCourseSubjects(req.body.program_courses_codes, subject.id);
          global.io.emit("add_subject", subject);
          return res.status(200).send({ success: true });
        })
        .catch((err) => {
          console.log(">> Error while adding Subjects", err);
          return res.status(404).send({ success: false });
        });
    }
  });
};

const db = require("../models");
const StudentSubject = db.studentSubject;
const Subject = db.subject;
const Student = db.student;
const User = db.user;
const UserType = db.userType;
const Program = db.program;
const Semester = db.semester;

exports.getall = (req, res) => {
  let join = [{ model: Subject }];
  if (req.query.semester_id) {
    join.push({ model: Semester, where: { id: req.query.semester_id } });
  }
  StudentSubject.findAll({
    where: { student_id: req.params.student_id },
    include: join,
  }).then((studentSubjects) => {
    res.send({ success: true, student_subjects: studentSubjects });
  });
};
exports.addStudentSubjects = (req, res) => {
  var join = [
    { model: Student, where: { id: req.params.student_id } },
    { model: UserType, where: { type: "student" } },
  ];
  Semester.findOne({ include: { model: Program, where: { id: 1 } } }).then(
    (semester) => {
      if (!semester)
        res
          .status(500)
          .send({ success: false, message: "No semester specified" });
      User.findOne({ include: join }).then((user) => {
        if (!user)
          res
            .status(500)
            .send({ success: false, message: "Student not found" });
        if (!req.body.subject_codes)
          res
            .status(500)
            .send({ success: false, message: "Please put subject codes" });
        req.body.subject_codes.map((code) => {
          Subject.findOne({ where: { code } }).then((subject) => {
            if (!subject) {
              console.log(`Error subject code: ${code}`);
              return;
            }
            StudentSubject.create({
              grade: 0,
              subject_id: subject.id,
              student_id: user.student.id,
              semester_id: semester.dataValues.id,
            }).then(() => {
              console.log(
                `Succesfully added subject with subject code: ${code} to student: ${user.email}`
              );
            });
          });
        });
        res.send({
          success: true,
          message: "Subjects has been added to the student.",
        });
      });
    }
  );
};

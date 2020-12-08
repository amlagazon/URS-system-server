const { studentSubject } = require("../models");
const db = require("../models");
const StudentSubject = db.studentSubject;
const Subject = db.subject;
const Student = db.student;
const User = db.user;
const UserType = db.userType;
const Program = db.program;
const Semester = db.semester;

exports.addStudentSubjects = (req, res) => {
  var join = [
    { model: Student, where: { id: req.params.student_id } },
    { model: UserType, where: { type: "student" } },
  ];
  console.log(`------Current semester: ${getCurrentSemester()}`);
  User.findOne({ include: join }).then((user) => {
    if (!user)
      res.status(500).send({ success: false, message: "Student not found" });

    if (req.body.subject_codes) {
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
          }).then(() => {
            console.log(
              `Succesfully added subject with subject code: ${code} to student: ${user.email}`
            );
          });
        });
      });
      res.send({
        success: false,
        message: "Subjects has been added to the student.",
      });
    } else {
      res
        .status(500)
        .send({ success: false, message: "Please put subject codes." });
    }
  });
};

function getCurrentSemester() {
  Semester.findOne({ include: { model: Program, where: { id: 1 } } }).then(
    (semester) => {
      console.log("xxxxxxx");
      console.log(semester.dataValues);
      console.log(semester.dataValues.id);
      console.log("xxxxxxx");
      return semester.dataValues.id;
    }
  );
}

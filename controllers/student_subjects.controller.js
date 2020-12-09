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

exports.edit = (req, res) => {
  StudentSubject.update(req.body, {
    where: { id: req.params.student_subject_id },
    include: { model: Student, where: { id: req.params.student_id } },
  }).then((success) => {
    res.send({ success: !!success[0] });
  });
};

exports.delete = (req, res) => {
  StudentSubject.destroy({
    where: {
      id: req.params.student_subject_id,
      student_id: req.params.student_id,
    },
  }).then((success) => {
    res.send({ success: !!success });
  });
};

exports.submitSubjects = (req, res) => {
  Student.findOne({
    where: {
      id: req.params.student_id,
    },
    include: { model: StudentSubject },
  }).then((student) => {
    if (!student)
      res.status(500).send({ success: false, message: "No student found" });
    let student_subjects = student.get({ plain: true }).student_subjects;
    if (
      student_subjects.length == 0 ||
      student_subjects.filter(
        (student_subject) =>
          student_subject.grade == null || student_subject.grade == 0
      ).length > 0
    ) {
      res
        .status(500)
        .send({
          success: false,
          message: "Please complete your subjects and grades",
        });
    } else {
      student.update({ subject_status: "pending" }).then((updatedStudent) => {
        res.send({ success: true });
      });
    }
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

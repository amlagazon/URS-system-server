const db = require("../models");
const Student = db.student;
const User = db.user;

exports.submitProfile = (req, res) => {
  Student.findOne({
    where: { id: req.params.student_id },
    include: { model: User },
  }).then((student) => {
    if (!student)
      res.status(500).send({ success: false, message: "No student found" });
    let missing_attributes = [];
    let user = student.dataValues.user.dataValues;
    if (user.first_name == null || user.first_name.length == 0) {
      missing_attributes.push("first name");
    }
    if (user.last_name == null || user.last_name.length == 0) {
      missing_attributes.push("last name");
    }
    if (user.email == null || user.email.length == 0) {
      missing_attributes.push("email");
    }
    if (user.student_number == null || student.student_number.length == 0) {
      missing_attributes.push("student number");
    }
    if (user.birthday == null || student.birthday.length == 0) {
      missing_attributes.push("birthday");
    }
    if (user.date_admission == null || student.date_admission.length == 0) {
      missing_attributes.push("date_admission");
    }
    if (user.rating_file == null || student.rating_file.length == 0) {
      missing_attributes.push("rating file");
    }
    if (user.first_name == null || student.year_level == 0) {
      missing_attributes.push("year level");
    }
    if (missing_attributes.length > 0) {
      res.status(500).send({
        success: false,
        missing_attributes,
        message: "Incomplete student profile",
      });
      return;
    }
    student.update({ status: "pending" }).then((updatedStudent) => {
      res.send({ success: true });
    });
  });
};

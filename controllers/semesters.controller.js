const db = require("../models");
const Semester = db.semester;

exports.getall = (req, res) => {
  Semester.findAll().then((semesters) =>
    res.send({ success: true, semesters })
  );
};

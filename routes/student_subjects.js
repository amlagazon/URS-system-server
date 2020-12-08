var express = require("express");
var router = express.Router();
const controller = require("../controllers/student_subjects.controlller");

router.post("/:student_id", controller.addStudentSubjects);

module.exports = router;

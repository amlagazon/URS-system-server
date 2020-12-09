var express = require("express");
var router = express.Router();
const controller = require("../controllers/student_subjects.controller");

router.post("/:student_id", controller.addStudentSubjects);

router.get("/:student_id", controller.getall);

router.put("/:student_id/:student_subject_id", controller.edit);

router.delete("/:student_id/:student_subject_id", controller.delete);

router.post("/:student_id/submit", controller.submitSubjects);

module.exports = router;

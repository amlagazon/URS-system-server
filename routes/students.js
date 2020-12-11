var express = require("express");
var router = express.Router();
const controller = require("../controllers/students.controller");

router.post("/:student_id/submit", controller.submitProfile);

module.exports = router;

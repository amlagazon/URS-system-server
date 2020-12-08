var express = require("express");
var router = express.Router();
const controller = require("../controllers/evaluators.controller");
const { verifySignUp } = require("../middleware");

/* change student profile status */
router.post("/students/:student_id/profile/approve", controller.approveProfile);
router.post("/students/:student_id/profile/reject", controller.rejectProfile);

// change student subject status
router.post("/students/:student_id/subjects/approve", controller.approveSubjects);
router.post("/students/:student_id/subjects/reject", controller.rejectSubjects);



module.exports = router;

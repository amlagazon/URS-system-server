var express = require("express");
var router = express.Router();
const controller = require("../controllers/programs.controller");
const { verifySignUp } = require("../middleware");

/* GET all programs listing. */
router.get("/", controller.getall);

// get specific program
router.get("/:id", controller.getOne);

// get specific program
router.put("/:id", controller.updateOne);

router.post("/:id/semester", controller.updateSemester);

module.exports = router;

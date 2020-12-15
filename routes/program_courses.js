var express = require("express");
var router = express.Router();
const controller = require("../controllers/program.courses.controller");

/* GET users listing. */
router.get("/", controller.getall);

module.exports = router;

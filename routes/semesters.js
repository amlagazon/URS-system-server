var express = require("express");
var router = express.Router();
const controller = require("../controllers/semesters.controller");

/* GET users listing. */
router.get("/", controller.getall);


module.exports = router;
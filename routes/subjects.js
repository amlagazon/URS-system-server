var express = require("express");
var router = express.Router();
const controller = require("../controllers/subjects.controller");

/* GET users listing. */
router.get("/", controller.getall);

router.post("/", controller.create);

module.exports = router;

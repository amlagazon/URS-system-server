var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var programsRouter = require("./routes/programs");
var cors = require("cors");
const bodyParser = require("body-parser");

var app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const userTypesSeed = require("./seed/user_types.js");
const userSeed = require("./seed/users.js");
const programsSeed = require("./seed/programs.js");
const semestersSeed = require("./seed/semesters.js");


const programs = require("./models/programs");

db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
db.sequelize.sync({ force: true }).then(() => {
  userTypesSeed.initializeUserTypes();
  userSeed.initializeUsers();
  semestersSeed.initializeSemesters()
  programsSeed.initializePrograms();


  programs
  console.log("Drop and Resync Db");
});
db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/programs", programsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

const db = require("./../models");
const UserType = db.userType;

function seed() {
  UserType.create({
    type: "student",
  });
  UserType.create({
    type: "evaluator",
  });
  UserType.create({
    type: "admin",
  });
}

module.exports.seed = seed;

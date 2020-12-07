const db = require("./../models");
const UserType = db.userType;

function initializeUserTypes() {
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

module.exports.initializeUserTypes = initializeUserTypes;

const db = require("./../models");
const User = db.user;
function initializeUsers() {
  User.create({
    email: "admin@urs.edu.ph",
    password: "12345678",
    user_type_id: 3,
  });
  User.create({
    email: "aaron.louie@gmail.com",
    password: "12345678",
    user_type_id: 1,
  });
  User.create({
    email: "jose.rizal@gmail.com",
    password: "12345678",
    user_type_id: 2,
  });
}

module.exports.initializeUsers = initializeUsers;

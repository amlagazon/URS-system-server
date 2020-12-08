const db = require("./../models");
const User = db.user;
const Student = db.student;
const Evaluator = db.evaluator;
const Admin = db.admin;
async function seed() {
  User.create(
    {
      frst_name: "Admin",
      last_name: "User",
      email: "admin@urs.edu.ph",
      password: "12345678",
      user_type_id: 3,
      admin: {},
    },
    { include: { model: Admin } }
  );
  User.create(
    {
      frst_name: "Aaron Louie",
      last_name: "Lagazon",
      email: "aaron.louie@gmail.com",
      password: "12345678",
      user_type_id: 1,
      student: { gwa: 1.2, student_number: "123456", program_id: 1 },
    },
    { include: { model: Student } }
  );
  User.create(
    {
      frst_name: "Jose",
      last_name: "Rizal",
      email: "jose.rizal@gmail.com",
      password: "12345678",
      user_type_id: 2,
      evaluator: { program_id: 1 },
    },
    { include: { model: Evaluator } }
  );
}

module.exports.seed = seed;

const db = require("./../models");
const User = db.user;
const Student = db.student;
const Evaluator = db.evaluator;
const Admin = db.admin;
async function seed() {
  User.create(
    {
      first_name: "Admin",
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
      first_name: "Aaron Louie",
      last_name: "Lagazon",
      email: "aaron.louie@gmail.com",
      password: "12345678",
      user_type_id: 1,
      student: {
        gwa: 1.2,
        student_number: "123456",
        program_id: 1,
        status: "approved",
        subject_status: "pending"
      },
    },
    { include: { model: Student } }
  );
  User.create(
    {
      first_name: "Maureen",
      last_name: "Batacan",
      email: "mau.b@gmail.com",
      password: "11111",
      user_type_id: 1,
      student: {
        gwa: 1.2,
        student_number: "123456",
        program_id: 1,
        status: "rejected",
        subject_status: "rejected"
      },
    },
    { include: { model: Student } }
  );
  User.create(
    {
      first_name: "Jose",
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

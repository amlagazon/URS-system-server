const db = require("./../models");
const User = db.user;
const Student = db.student;
const Evaluator = db.evaluator;
const Admin = db.admin;
var bcrypt = require("bcryptjs");
async function seed() {
  try {
    User.create(
      {
        first_name: "Admin",
        last_name: "User",
        email: "admin@urs.edu.ph",
        password: bcrypt.hashSync("12345678", 8),
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
        password: bcrypt.hashSync("12345678", 8),
        user_type_id: 1,
        student: {
          gwa: 1.2,
          student_number: "123456",
          program_id: 1,
          status: "approved",
          subject_status: "pending",
        },
      },
      { include: { model: Student } }
    );
    User.create(
      {
        first_name: "Maureen",
        last_name: "Batacan",
        email: "mau.b@gmail.com",
        password: bcrypt.hashSync("11111", 8),
        user_type_id: 1,
        student: {
          gwa: 1.2,
          student_number: "123456",
          program_id: 1,
          status: "rejected",
          subject_status: "rejected",
        },
      },
      { include: { model: Student } }
    );
    User.create(
      {
        first_name: "Jose",
        last_name: "Rizal",
        email: "jose.rizal@gmail.com",
        password: bcrypt.hashSync("12345678", 8),
        user_type_id: 2,
        evaluator: { program_id: 1, program_course_id: 1 },
      },
      { include: { model: Evaluator } }
    );
    User.create(
      {
        first_name: "Jireh",
        last_name: "Lim",
        email: "jireh.lim@gmail.com",
        password: bcrypt.hashSync("12345678", 8),
        user_type_id: 2,
        evaluator: { program_id: 1, program_course_id: 1 },
      },
      { include: { model: Evaluator } }
    );
    User.create(
      {
        first_name: "Justin",
        last_name: "KJieber",
        email: "jireh.lim@gmail.com",
        password: bcrypt.hashSync("12345678", 8),
        user_type_id: 2,
        evaluator: { program_id: 1, program_course_id: 2 },
      },
      { include: { model: Evaluator } }
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports.seed = seed;

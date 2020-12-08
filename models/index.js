const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users.js")(sequelize, Sequelize);
db.userType = require("./user.types.js")(sequelize, Sequelize);
db.admin = require("./user.admins.js")(sequelize, Sequelize);
db.evaluator = require("./user.evaluators.js")(sequelize, Sequelize);
db.student = require("./user.students.js")(sequelize, Sequelize);
db.programCourse = require("./program.courses.js")(sequelize, Sequelize);
db.program = require("./programs.js")(sequelize, Sequelize);
db.semester = require("./semesters.js")(sequelize, Sequelize);
db.subject = require("./subjects.js")(sequelize, Sequelize);
db.studentSubject = require("./student.subjects.js")(sequelize, Sequelize);

db.userType.hasMany(db.user, { foreignKey: "user_type_id" });
db.user.belongsTo(db.userType, { foreignKey: "user_type_id" });
db.user.belongsTo(db.student, { foreignKey: "student_id" });
db.user.belongsTo(db.admin, { foreignKey: "admin_id" });
db.user.belongsTo(db.evaluator, { foreignKey: "evaluator_id" });

db.evaluator.belongsTo(db.program, { foreignKey: "program_id" });

db.student.belongsTo(db.programCourse, { foreignKey: "program_course_id" });
db.student.hasMany(db.studentSubject, { foreignKey: "student_id" });

db.program.hasMany(db.evaluator, { foreignKey: "program_id" });
db.program.belongsTo(db.semester, { foreignKey: "semester_id" });

db.studentSubject.belongsTo(db.semester, { foreignKey: "semester_id" });
db.studentSubject.belongsTo(db.student, { foreignKey: "student_id" });
db.studentSubject.belongsTo(db.subject, { foreignKey: "subject_id" });

db.semester.hasMany(db.studentSubject, { foreignKey: "semester_id" });
db.semester.hasMany(db.program, { foreignKey: "semester_id" });

db.programCourse.belongsTo(db.program, { foreignKey: "program_id" });
db.programCourse.hasMany(db.student, { foreignKey: "program_course_id" });

db.subject.belongsTo(db.program, { foreignKey: "program_id" });

db.programCourse.belongsToMany(db.subject, {
  through: "program_course_subjects",
  as: "subjects",
  foreignKey: "program_course_id",
});

db.subject.belongsToMany(db.programCourse, {
  through: "program_course_subjects",
  as: "program_courses",
  foreignKey: "subject_id",
});

module.exports = db;

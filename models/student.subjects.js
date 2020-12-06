module.exports = (sequelize, Sequelize) => {
  const StudentSubject = sequelize.define("student_subjects", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    grade: {
      type: Sequelize.DECIMAL,
    }
  });

  return StudentSubject;
};

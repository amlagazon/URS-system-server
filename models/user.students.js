module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("students", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gwa: {
      type: Sequelize.DECIMAL,
    },
    student_number: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.DATE,
    },
    address: {
      type: Sequelize.STRING,
    },
    date_admission: {
      type: Sequelize.DATE,
    },
    rate_of_record: {
      type: Sequelize.STRING,
    },
    year_level: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
    subject_status: {
      type: Sequelize.INTEGER,
    }
  });

  return Student;
};

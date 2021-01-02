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
      type: Sequelize.DATEONLY,
    },
    address: {
      type: Sequelize.STRING,
    },
    date_admission: {
      type: Sequelize.DATEONLY,
    },
    rating_file: {
      type: Sequelize.STRING,
    },
    year_level: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "to_submit",
    },
    subject_status: {
      type: Sequelize.STRING,
      defaultValue: "to_submit",
    },
    number_of_subjects: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  return Student;
};

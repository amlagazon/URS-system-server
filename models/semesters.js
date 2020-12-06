module.exports = (sequelize, Sequelize) => {
  const Semester = sequelize.define("semesters", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    school_year: {
      type: Sequelize.STRING,
    },
    semester: {
      type: Sequelize.INTEGER,
    },
  });

  return Semester;
};

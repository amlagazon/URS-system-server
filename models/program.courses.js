module.exports = (sequelize, Sequelize) => {
  const ProgramCourse = sequelize.define("program_courses", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    display_name: {
      type: Sequelize.STRING,
    },
  });

  return ProgramCourse;
};

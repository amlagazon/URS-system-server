module.exports = (sequelize, Sequelize) => {
  const Subject = sequelize.define("subjects", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year_level: {
      type: Sequelize.INTEGER,
    },
    semester: {
      type: Sequelize.INTEGER,
    },
    display_name: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
      unique: true,
    },
    units: {
      type: Sequelize.INTEGER,
    },
  });

  return Subject;
};

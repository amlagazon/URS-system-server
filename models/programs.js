module.exports = (sequelize, Sequelize) => {
  const Program = sequelize.define("programs", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    school_name: {
      type: Sequelize.STRING,
    },
    college: {
      type: Sequelize.STRING,
    }
  });

  return Program;
};

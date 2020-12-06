module.exports = (sequelize, Sequelize) => {
  const UserType = sequelize.define("user_types", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.STRING,
    },
  });

  return UserType;
};

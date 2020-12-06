module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admins", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  });

  return Admin;
};

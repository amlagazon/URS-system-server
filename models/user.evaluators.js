module.exports = (sequelize, Sequelize) => {
  const Evaluator = sequelize.define("evaluators", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

  return Evaluator;
};

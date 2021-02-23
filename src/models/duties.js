const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class duties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      duties.belongsTo(models.users, {
        foreignKey: 'dutyid',
        onDelete: 'CASCADE',
      });
    }
  }
  duties.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'duties',
  });
  return duties;
};

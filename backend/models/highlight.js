'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Highlight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Highlight.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Highlight.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    cover: DataTypes.STRING,
    video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Highlight',
  });
  return Highlight;
};
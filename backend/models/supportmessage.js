'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupportMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SupportMessage.belongsTo(models.User,{
        foreignKey: 'userId',
      });
      SupportMessage.hasOne(models.SupportMessage,{
        foreignKey: 'csId',
      });
    }
  }
  SupportMessage.init({
    message: DataTypes.STRING,
    reply: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    csId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SupportMessage',
  });
  return SupportMessage;
};
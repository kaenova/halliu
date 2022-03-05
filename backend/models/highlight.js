"use strict";
const { Model } = require("sequelize");
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
  Highlight.init(
    {
       userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        alloNull: false,
      },
      title: {
        type: DataTypes.STRING,
        alloNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        alloNull: false,
      },
      video: {
        type: DataTypes.STRING,
        alloNull: false,
      },
    },
    {
      sequelize,
      modelName: "Highlight",
    }
  );
  return Highlight;
};

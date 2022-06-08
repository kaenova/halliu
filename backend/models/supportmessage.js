import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class SupportMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SupportMessage.belongsTo(models.User, {
        foreignKey: "userId",
        as : "reqUser"
      });
      SupportMessage.belongsTo(models.User, {
        foreignKey: "csId",
      });
    }
  }
  SupportMessage.init(
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reply: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      video: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      csId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SupportMessage",
    }
  );
  return SupportMessage;
};

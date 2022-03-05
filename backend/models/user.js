import { Model } from "sequelize";
import jwt from "jsonwebtoken";

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.SupportMessage, {
        foreignKey: "userId",
      });
      User.hasMany(models.SupportMessage, {
        foreignKey: "csId",
      });
      User.hasMany(models.Highlight, {
        foreignKey: "userId",
      });
    }

    createJWT() {
      let payload = {
        id: this.id,
        email: this.email,
        role: this.role,
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return token;
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

import {Sequelize, DataTypes, Model} from '@sequelize/core';
import db from '../db/index.mjs';
import jwt from 'jsonwebtoken'

let sequelize = db.getDB();

class User extends Model {

  createJWT() {
    let payload = {
      id: this.id,
      email: this.email,
      role: this.role
    }
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d"
    })
    return token
  }

}

User.init({
    nama: { type: DataTypes.STRING, 
            allowNull: false,
          },
    email: {type: DataTypes.STRING,
            unique: true,
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'users'
})

User.sync()

export default User
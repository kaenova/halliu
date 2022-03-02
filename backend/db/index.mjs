import {Sequelize} from 'sequelize';
import {User} from '../model/index.mjs'

class Database { 
  constructor () {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './db/database.sqlite',
      logging: false
    });

    try {
      this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (e) {
      console.error('Unable to connect to the database:', e);
    }
  }

  getDB () {
    return this.sequelize;
  }
}

const db = new Database();

export default db
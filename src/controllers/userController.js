import sequelize from 'sequelize';
import User from '../database/models/user';
import { client } from '../middlewares';

const userModel = User(client, sequelize.DataTypes);

export default class UserController {
  static addUser(name, email) {
    return userModel.create({ name, email });
  }

  static getUserById(id) {
    return userModel.find({ where: { id } });
  }

  static getUsers() {
    return userModel.findAll();
  }
}

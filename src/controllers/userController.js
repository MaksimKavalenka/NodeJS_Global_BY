import _ from 'lodash';
import { User } from '../models';

const users = [];

export default class UserController {
  static addUser(name, age, city) {
    const user = new User(name, age, city);
    users.push(user);
    return user;
  }

  static getUserById(id) {
    return _.find(users, user => user.id === id);
  }

  static getUsers() {
    return users;
  }
}

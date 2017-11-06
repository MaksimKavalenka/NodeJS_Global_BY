import _ from 'lodash';
import { User } from '../models';

const users = [];

export default class UserController {
  static addUser(name, email) {
    const user = new User(name, email);
    users.push(user);
    return user;
  }

  static getUserById(id) {
    return _.find(users, user => (user.id === id));
  }

  static getUsers() {
    return users;
  }
}

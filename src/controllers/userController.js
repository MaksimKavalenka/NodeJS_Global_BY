import _ from 'lodash';
import { User } from '../models';

let userId = 0;
const users = [];

export default class UserController {
  static addUser(name, email) {
    userId += 1;
    const user = new User(userId, name, email);
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

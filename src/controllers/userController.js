import { User } from '../models';

export default class UserController {
  static addUser(name, email) {
    const user = new User({ name, email });
    return user.save();
  }

  static getUser(_id) {
    return User.findOne({ _id });
  }

  static getUsers() {
    return User.find();
  }

  static deleteUser(_id) {
    return User.remove({ _id });
  }
}

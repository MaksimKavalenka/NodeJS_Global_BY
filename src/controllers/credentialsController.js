import { Credentials } from '../models';

export default class CredentialsController {
  static addCredentials(userId, login, password) {
    const credentials = new Credentials({ _id: userId, login, password });
    return credentials.save();
  }

  static deleteCredentials(_id) {
    return Credentials.remove({ _id });
  }

  static verifyCredentials(login, password) {
    return Credentials.findOne({ login, password });
  }
}

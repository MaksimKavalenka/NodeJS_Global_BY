import sequelize from 'sequelize';
import Credentials from '../database/models/credentials';
import { client } from '../middlewares';

const credentialsModel = Credentials(client, sequelize.DataTypes);

export default class CredentialsController {
  static addCredentials(userId, login, password) {
    return credentialsModel.create({ userId, login, password });
  }

  static getCredentialsByUserId(userId) {
    return credentialsModel.find({ where: { userId } });
  }

  static verifyCredentials(login, password) {
    return credentialsModel.find({ where: { login, password } });
  }

  static getCredentials() {
    return credentialsModel.findAll();
  }
}

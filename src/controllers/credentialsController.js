import _ from 'lodash';
import { Credentials } from '../models';

const credentials = [];

export default class CredentialsController {
  static addCredentials(userId, login, password) {
    const creds = new Credentials(userId, login, password);
    credentials.push(creds);
    return creds;
  }

  static getCredentialsById(id) {
    return _.find(credentials, creds => (creds.userId === id));
  }

  static verifyCredentials(login, password) {
    return _.find(credentials, creds => ((creds.login === login) && (creds.password === password)));
  }

  static getCredentials() {
    return credentials;
  }
}

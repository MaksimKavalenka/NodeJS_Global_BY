import jwt from 'jsonwebtoken';
import config from '../config/config.json';
import customConfig from '../config/customConfig.json';

export default class JWT {
  static generateJwt(payload) {
    return jwt.sign(payload.toString(), customConfig.secret, { expiresIn: config.expiration_time });
  }
}

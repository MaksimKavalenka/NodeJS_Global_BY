import jwt from 'jsonwebtoken';
import config from '../config';
import { ExpressMiddleware } from '../middlewares';

export default class JWT {
  static generateJwt(payload) {
    return jwt.sign(payload.toString(), config.secret, { expiresIn: config.expiration_time });
  }

  static verifyJwt() {
    return (req, res, next) => {
      const token = req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, config.secret, (error) => {
          if (error) {
            ExpressMiddleware.sendResponse(res, 400, error);
          } else {
            next();
          }
        });
      } else {
        ExpressMiddleware.sendResponse(res, 403, { error: __('no_token') });
      }
    };
  }
}

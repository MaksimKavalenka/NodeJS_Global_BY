import config from '../config/config.json';
import { logger } from '../models';

export default class {
  constructor() {
    logger.log('debug', config.user_log);
  }
}

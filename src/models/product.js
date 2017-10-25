import config from '../config/config.json';
import { logger } from '../utils';

export default class {
  constructor() {
    logger.log('debug', config.product_log);
  }
}

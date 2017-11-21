import util from 'util';
import { ExpressMiddleware, logger } from '../middlewares';

export class ErrorHandler {
  static async handleFunc(func) {
    try {
      await func();
    } catch (error) {
      logger.warn(error.message);
    }
  }
}

export class ResponseHandler {
  static async mongoResponse(res, result, entity, id) {
    switch (result.n) {
      case 0:
        ExpressMiddleware.sendResponse(res, 404, util.format(__(`${entity}_not_found`), id));
        break;
      case 1:
        ExpressMiddleware.sendResponse(res, 200, util.format(__(`${entity}_deleted`), id));
        break;
      default:
        break;
    }
  }
}

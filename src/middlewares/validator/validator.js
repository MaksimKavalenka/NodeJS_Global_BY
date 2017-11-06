import ajv from 'ajv';
import credentialsSchema from './schema/credentialsSchema.json';
import productSchema from './schema/productSchema.json';
import reviewSchema from './schema/reviewSchema.json';
import userSchema from './schema/userSchema.json';
import { ExpressMiddleware } from '../../middlewares';

export const schema = {
  CREDENTIALS_SCHEMA: 'credentialsSchema',
  PRODUCT_SCHEMA: 'productSchema',
  REVIEW_SCHEMA: 'reviewSchema',
  USER_SCHEMA: 'userSchema',
};

const validator = ajv({ allErrors: true, removeAdditional: 'all' });
validator.addSchema(credentialsSchema, schema.CREDENTIALS_SCHEMA);
validator.addSchema(productSchema, schema.PRODUCT_SCHEMA);
validator.addSchema(reviewSchema, schema.REVIEW_SCHEMA);
validator.addSchema(userSchema, schema.USER_SCHEMA);

export class Validator {
  static validateSchema(schemaName) {
    return (req, res, next) => {
      const isValid = validator.validate(schemaName, req.body);
      if (!isValid) {
        const errors = validator.errors.map(error =>
          ({
            path: error.dataPath,
            message: error.message,
          }));
        ExpressMiddleware.sendResponse(res, 400, { error: errors });
      } else {
        next();
      }
    };
  }
}

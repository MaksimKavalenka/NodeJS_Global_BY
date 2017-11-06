import ajv from 'ajv';
import credentialsSchema from './schema/credentialsSchema.json';
import productSchema from './schema/productSchema.json';
import reviewSchema from './schema/reviewSchema.json';
import userSchema from './schema/userSchema.json';

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
  static errorResponse(schemaErrors) {
    const errorResp = schemaErrors.map(error =>
      ({
        path: error.dataPath,
        message: error.message,
      }));
    return {
      status: 'failed',
      errors: errorResp,
    };
  }

  static validateSchema(schemaName) {
    return (req, res, next) => {
      const isValid = validator.validate(schemaName, req.body);
      if (!isValid) {
        res.status(400).json(Validator.errorResponse(validator.errors));
      } else {
        next();
      }
    };
  }
}

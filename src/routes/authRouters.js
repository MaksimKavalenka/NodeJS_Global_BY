import express from 'express';
import { CredentialsRouteUtils } from '../helpers';
import { Validator, schema } from '../middlewares';

const router = express.Router();

const path = { ROOT: '/auth' };

router.route(path.ROOT)
  .post(
    Validator.validateSchema(schema.CREDENTIALS_SCHEMA),
    CredentialsRouteUtils.verifyCredentials,
  );

module.exports = router;

import express from 'express';
import passport from 'passport';
import { CredentialsRouteUtils } from '../helpers';
import { Validator, schema } from '../middlewares';

const router = express.Router();

const path = { ROOT: '/auth' };
path.PASSPORT = `${path.ROOT}/passport`;

router.route(path.ROOT)
  .post(
    Validator.validateSchema(schema.CREDENTIALS_SCHEMA),
    CredentialsRouteUtils.verifyCredentials,
  );

router.route(path.PASSPORT)
  .post(
    Validator.validateSchema(schema.CREDENTIALS_SCHEMA),
    passport.authenticate('local', { session: false }),
    CredentialsRouteUtils.verifyCredentialsPassport,
  );

module.exports = router;

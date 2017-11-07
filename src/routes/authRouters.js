import express from 'express';
import passport from 'passport';
import { CredentialsRouteUtils } from '../helpers';
import { Validator, schema } from '../middlewares';

const router = express.Router();

const path = { ROOT: '/auth' };
path.PASSPORT = `${path.ROOT}/passport`;
path.PASSPORT_FACEBOOK = `${path.PASSPORT}/facebook`;
path.PASSPORT_FACEBOOK_CALLBACK = `${path.PASSPORT_FACEBOOK}/callback`;
path.PASSPORT_GOOGLE = `${path.PASSPORT}/google`;
path.PASSPORT_GOOGLE_CALLBACK = `${path.PASSPORT_GOOGLE}/callback`;
path.PASSPORT_TWITTER = `${path.PASSPORT}/twitter`;
path.PASSPORT_TWITTER_CALLBACK = `${path.PASSPORT_TWITTER}/callback`;

router.route(path.ROOT)
  .post(
    Validator.validateSchema(schema.CREDENTIALS_SCHEMA),
    CredentialsRouteUtils.verifyCredentials,
  );

router.route(path.PASSPORT)
  .post(
    Validator.validateSchema(schema.CREDENTIALS_SCHEMA),
    passport.authenticate('local'),
    CredentialsRouteUtils.verifyCredentialsPassport,
  );

router.route(path.PASSPORT_FACEBOOK)
  .get(passport.authenticate('facebook'));

router.route(path.PASSPORT_FACEBOOK_CALLBACK)
  .get(
    passport.authenticate('facebook'),
    CredentialsRouteUtils.verifyCredentialsPassportSocial,
  );

router.route(path.PASSPORT_GOOGLE)
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route(path.PASSPORT_GOOGLE_CALLBACK)
  .get(
    passport.authenticate('google'),
    CredentialsRouteUtils.verifyCredentialsPassportSocial,
  );

router.route(path.PASSPORT_TWITTER)
  .get(passport.authenticate('twitter'));

router.route(path.PASSPORT_TWITTER_CALLBACK)
  .get(CredentialsRouteUtils.verifyCredentialsPassportSocial);

module.exports = router;

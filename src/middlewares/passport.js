import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth';
import LocalStrategy from 'passport-local';
import TwitterStrategy from 'passport-twitter';
import config from '../config';
import { CredentialsController, UserController } from '../controllers';

export default function initPassport() {
  passport.serializeUser((user, next) => {
    next(null, user.id);
  });

  passport.deserializeUser((id, next) => {
    const user = UserController.getUser(id);
    next(null, user);
  });

  passport.use(new FacebookStrategy.Strategy({
    clientID: config.facebook_app_id,
    clientSecret: config.facebook_app_secret,
    callbackURL: 'http://localhost:8090/api/auth/passport/facebook/callback',
  }, (accessToken, refreshToken, profile, next) => next(null, profile)));

  passport.use(new GoogleStrategy.OAuth2Strategy({
    clientID: config.google_app_id,
    clientSecret: config.google_app_secret,
    callbackURL: 'http://localhost:8090/api/auth/passport/google/callback',
  }, (token, refreshToken, profile, next) => next(null, profile)));

  passport.use(new LocalStrategy.Strategy({
    usernameField: 'login',
    passwordField: 'password',
    session: false,
  }, async (login, password, next) => {
    const creds = await CredentialsController.verifyCredentials(login, password);
    if (creds) {
      const user = await UserController.getUser(creds._id);
      next(null, user);
    } else {
      next(null, false, locale('auth_failure'));
    }
  }));

  passport.use(new TwitterStrategy.Strategy({
    consumerKey: config.twitter_app_id,
    consumerSecret: config.twitter_app_secret,
    callbackURL: 'http://localhost:8090/api/auth/passport/twitter/callback',
  }, (token, tokenSecret, profile, next) => next(null, profile)));
}

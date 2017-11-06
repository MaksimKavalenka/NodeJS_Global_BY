import passport from 'passport';
import LocalStrategy from 'passport-local';
import { CredentialsController, UserController } from '../controllers';

export default function initPassport() {
  passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    session: false,
  }, (login, password, next) => {
    const creds = CredentialsController.verifyCredentials(login, password);
    if (creds) {
      const user = UserController.getUserById(creds.userId);
      next(null, user);
    } else {
      next(null, false, __('auth_failure'));
    }
  }));
}

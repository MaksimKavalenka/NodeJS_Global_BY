import express from 'express';
import session from 'express-session';
import i18n from 'i18n';
import passport from 'passport';
import config from './config';
import { ExpressMiddleware, JWT, logger } from './middlewares';
import { authRouters, cityRouters, productRouter, userRouter } from './routes';

const app = express();

app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.url}`);
  next();
});
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(i18n.init);
app.use(passport.initialize());
app.use(passport.session());
app.use(ExpressMiddleware.cookieParser());
app.use(ExpressMiddleware.queryParser());
app.use(/\/((?!auth).)*/, JWT.verifyJwt());
app.use('/api', authRouters);
app.use('/api', cityRouters);
app.use('/api', productRouter);
app.use('/api', userRouter);

module.exports = app;

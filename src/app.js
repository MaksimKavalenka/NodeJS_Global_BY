import express from 'express';
import session from 'express-session';
import i18n from 'i18n';
import passport from 'passport';
import config from './config';
import { CredentialsController, ProductController, ReviewController, UserController } from './controllers';
import { ExpressMiddleware, JWT, logger } from './middlewares';
import { authRouters, productRouter, userRouter } from './routes';

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
app.use('/api', productRouter);
app.use('/api', userRouter);

ProductController.addProduct('product1', 'brand1', 55);
ProductController.addProduct('product2', 'brand2', 85);
ProductController.addProduct('product3', 'brand3', 144);

ReviewController.addReview('1', 'author11', 'text11');
ReviewController.addReview('1', 'author12', 'text12');
ReviewController.addReview('1', 'author13', 'text13');

ReviewController.addReview('2', 'author21', 'text21');
ReviewController.addReview('2', 'author22', 'text22');
ReviewController.addReview('2', 'author23', 'text23');

ReviewController.addReview('3', 'author31', 'text31');
ReviewController.addReview('3', 'author32', 'text32');
ReviewController.addReview('3', 'author33', 'text33');

const user = UserController.addUser('Maks', 'admin@node.com');
CredentialsController.addCredentials(user.id, 'admin', 'node123');

module.exports = app;

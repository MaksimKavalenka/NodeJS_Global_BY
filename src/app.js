import express from 'express';
import { ProductController, ReviewController, UserController } from './controllers';
import { ExpressMiddleware, echoServer, htmlServer, jsonServer, plainTextServer, logger } from './middlewares';
import { productRouter, userRouter } from './routes';

const app = express();

plainTextServer(8081);
htmlServer(8082);
jsonServer(8083);
echoServer(8084);

app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(ExpressMiddleware.cookieParser);
app.use(ExpressMiddleware.queryParser);
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

UserController.addUser('user1', 32, 'city1');
UserController.addUser('user2', 24, 'city2');
UserController.addUser('user3', 48, 'city3');

module.exports = app;

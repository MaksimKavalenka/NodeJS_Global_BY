import express from 'express';
import { ExpressMiddleware, echoServer, htmlServer, jsonServer, plainTextServer } from './middlewares';
import { productRouter, userRouter } from './routes';

const app = express();

plainTextServer(8081);
htmlServer(8082);
jsonServer(8083);
echoServer(8084);

ExpressMiddleware.handleRequest(app);
app.use('/api', productRouter);
app.use('/api', userRouter);

module.exports = app;

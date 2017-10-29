import cookieParser from 'cookie-parser';
import express from 'express';

export default class ExpressMiddleware {
  static handleRequest(app) {
    app.use(express.json());
    app.use(cookieParser());
  }
}

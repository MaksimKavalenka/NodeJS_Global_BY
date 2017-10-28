import cookieParser from 'cookie-parser';
import express from 'express';
import { echoServer, htmlServer, jsonServer, plainTextServer } from './middlewares';

const app = express();
const router = express.Router();

plainTextServer(8081);
htmlServer(8082);
jsonServer(8083);
echoServer(8084);

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

router.get('/products/:id', (req, res) => {
  res.json({ id: req.params.id });
});

module.exports = app;

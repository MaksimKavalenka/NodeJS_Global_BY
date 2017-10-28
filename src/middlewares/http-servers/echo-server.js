import http from 'http';
import config from '../../config/config.json';
import { logger } from '../../middlewares';

export default function createEchoServer(port) {
  http.createServer((req, res) => {
    req.pipe(res);
  }).listen(port, () => logger.info(`Echo ${config.server_listening} ${port}!`));
}

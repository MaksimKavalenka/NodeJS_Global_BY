import http from 'http';
import { logger } from '../../middlewares';

export default function createEchoServer(port) {
  http.createServer((req, res) => {
    req.pipe(res);
  }).listen(port, () => logger.info(`Echo ${locale('server_listening')} ${port}`));
}

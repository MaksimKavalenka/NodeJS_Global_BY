import http from 'http';
import { logger } from '../../middlewares';

export default function createPlainTextServer(port) {
  http.createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.end('Hello World');
  }).listen(port, () => logger.info(`Plain text ${locale('server_listening')} ${port}`));
}

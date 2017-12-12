import http from 'http';
import util from 'util';
import { logger } from '../../middlewares';

export default function createPlainTextServer(port) {
  http.createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.end('Hello World');
  }).listen(port, () => logger.info(util.format(locale('server_listening'), 'Plain text', port)));
}

import http from 'http';
import util from 'util';
import { logger } from '../../middlewares';

export default function createEchoServer(port) {
  http.createServer((req, res) => {
    req.pipe(res);
  }).listen(port, () => logger.info(util.format(__('server_listening'), 'Echo', port)));
}

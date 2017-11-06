import http from 'http';
import { logger } from '../../middlewares';

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [{
    color: 'blue',
  }, {
    size: 'XL',
  }],
};

export default function createJsonServer(port) {
  http.createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(product));
  }).listen(port, () => logger.info(`JSON ${__('server_listening')} ${port}`));
}

import http from 'http';
import util from 'util';
import { City } from '../../models';
import { logger } from '../../middlewares';

export default function createCityServer(port) {
  http.createServer(async (req, res) => {
    const count = await City.count();
    const random = Math.floor(Math.random() * count);
    const city = await City.findOne({}).skip(random);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(city));
  }).listen(port, () => logger.info(util.format(__('server_listening'), 'City', port)));
}

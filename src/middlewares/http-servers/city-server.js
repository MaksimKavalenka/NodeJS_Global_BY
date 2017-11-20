import http from 'http';
import util from 'util';
import { connectors, logger } from '../../middlewares';

export default function createCityServer(port) {
  http.createServer(async (req, res) => {
    const citiesCollection = connectors.MONGO.client.collection('cities');
    const count = await citiesCollection.count();
    const random = Math.floor(Math.random() * count);
    const city = await citiesCollection.find({}).skip(random).limit(1).toArray();
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(city));
  }).listen(port, () => logger.info(util.format(__('server_listening'), 'City', port)));
}

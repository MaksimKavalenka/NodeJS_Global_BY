import util from 'util';
import app from './app';
import initLocale from './lang';
import { cityServer, echoServer, htmlServer, jsonServer, plainTextServer, initPassport, connectors, logger } from './middlewares';

const port = process.env.PORT || 8090;

initLocale();
initPassport();

const createServer = async () => {
  try {
    await connectors.POSTGRES.connect();
    await connectors.MONGO.connect();
    const collection = await connectors.MONGO.client.createCollection('cities');
    await collection.insertMany([{
      name: 'Brest', country: 'Belarus', capital: false, location: { lat: 52.097621, long: 23.734050 },
    }, {
      name: 'Gomel', country: 'Belarus', capital: false, location: { lat: 52.2630, long: 30.5900 },
    }, {
      name: 'Minsk', country: 'Belarus', capital: true, location: { lat: 53.5500, long: 27.3300 },
    }]);
    app.listen(port, () => logger.info(util.format(__('server_listening'), 'App', port)));
  } catch (err) {
    logger.error(err);
  }
};

createServer();
plainTextServer(8091);
htmlServer(8092);
jsonServer(8093);
echoServer(8094);
cityServer(8095);

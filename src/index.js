import util from 'util';
import app from './app';
import initLocale from './lang';
import { cityServer, echoServer, htmlServer, jsonServer, plainTextServer, initPassport, connectors, logger } from './middlewares';

const port = process.env.PORT || 8090;

initLocale();
initPassport();

(async () => {
  try {
    await connectors.MONGO.connect();
    app.listen(port, () => logger.info(util.format(locale('server_listening'), 'App', port)));
  } catch (err) {
    logger.error(err);
  }
})();

plainTextServer(8091);
htmlServer(8092);
jsonServer(8093);
echoServer(8094);
cityServer(8095);

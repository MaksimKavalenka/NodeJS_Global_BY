import util from 'util';
import app from './app';
import initLocale from './lang';
import { echoServer, htmlServer, jsonServer, plainTextServer, initPassport, connect, logger } from './middlewares';

const port = process.env.PORT || 8090;

initLocale();
initPassport();

const createServer = async () => {
  try {
    await connect();
    app.listen(port, () => logger.info(util.format(locale('server_listening'), 'App', port)));
  } catch (err) {
    logger.error(err);
  }
};

createServer();
plainTextServer(8091);
htmlServer(8092);
jsonServer(8093);
echoServer(8094);

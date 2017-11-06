import app from './app';
import { initLocale } from './lang';
import { echoServer, htmlServer, jsonServer, plainTextServer, logger } from './middlewares';

const port = process.env.PORT || 8090;

initLocale();
app.listen(port, () => logger.info(`App ${__('server_listening')} ${port}`));

plainTextServer(8091);
htmlServer(8092);
jsonServer(8093);
echoServer(8094);

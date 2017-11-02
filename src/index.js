import app from './app';
import config from './config/config.json';
import { echoServer, htmlServer, jsonServer, plainTextServer, logger } from './middlewares';

const port = process.env.PORT || 8090;
app.listen(port, () => logger.info(`App ${config.server_listening} ${port}`));

plainTextServer(8091);
htmlServer(8092);
jsonServer(8093);
echoServer(8094);

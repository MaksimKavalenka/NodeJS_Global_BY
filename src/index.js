import app from './app';
import config from './config/config.json';
import { logger } from './middlewares';

const port = process.env.PORT || 8080;
app.listen(port, () => logger.info(`App ${config.server_listening} ${port}`));

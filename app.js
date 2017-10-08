import { DirWatcher, Importer, logger } from './models';

const dirWatcher = new DirWatcher();

dirWatcher.watch('./data/', 10000);
dirWatcher.on('dirwatcher:changed', async (path) => {
  try {
    const result = await Importer.import(path);
    logger.info(`ASYNC ${path} ${result}`);
  } catch (error) {
    logger.error(error.message);
  }
  logger.info(`SYNC ${path} ${Importer.importSync(path)}`);
});

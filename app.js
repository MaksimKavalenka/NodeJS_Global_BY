import { DirWatcher, Importer, logger } from './models';

const dirWatcher = new DirWatcher();

dirWatcher.watch('./data/**/*.csv', 10000);
dirWatcher.on('dirwatcher:changed', (path) => {
  (async () => {
    const result = await Importer.import(path);
    logger.info(`ASYNC ${path} ${result}`);
  })();
  logger.info(`SYNC ${path} ${Importer.importSync(path)}`);
});

import { DirWatcher, Importer, logger } from './models';

const dirWatcher = new DirWatcher();

dirWatcher.watch('./data/', 10000);
dirWatcher.on('dirwatcher:changed', (path) => {
  Importer.import(path)
    .then(result => logger.log('info', `ASYNC ${path} ${result}`))
    .catch(error => logger.log('error', error.message));
  logger.log('info', `SYNC ${path} ${Importer.importSync(path)}`);
});

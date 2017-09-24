import { DirWatcher, Importer } from './models';

const Log = require('log');

const dirWatcher = new DirWatcher();
const log = new Log();

dirWatcher.watch('./data/', 10000);
dirWatcher.on('dirwatcher:changed', (path) => {
  Importer.import(path)
    .then(result => log.info(`ASYNC ${path} ${result}`))
    .catch(error => log.error(error.message));
  log.info(`SYNC ${path} ${Importer.importSync(path)}`);
});

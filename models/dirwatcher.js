import Promise from 'bluebird';
import EventEmitter from 'events';
import fs from 'fs';
import Log from 'log';

const log = new Log();
const readdirAsync = Promise.promisify(fs.readdir);

export class DirWatcher extends EventEmitter {
  watch(path, delay) {
    readdirAsync(path)
      .then(files =>
        files.forEach((file) => {
          const filePath = `${path}${file}`;
          if (file.split('.').pop() === 'csv') {
            fs.watchFile(filePath, { interval: delay }, () => {
              log.debug(`${file} has been changed`);
              this.emit('dirwatcher:changed', filePath);
            });
          }
        }))
      .catch(error => log.error(error.message));
  }
}

const Promise = require('bluebird');
const EventEmitter = require('events');
const fs = require('fs');
const Log = require('log');

const log = new Log();
const readdirAsync = Promise.promisify(fs.readdir);

export class DirWatcher extends EventEmitter {
  watch(path, delay) {
    readdirAsync(path)
      .then(files =>
        files.forEach((file) => {
          const filePath = `${path}${file}`;
          fs.watchFile(filePath, { interval: delay }, () => {
            log.debug(`${file} has been changed`);
            this.emit('dirwatcher:changed', filePath);
          });
        }))
      .catch(error => log.error(error.message));
  }
}

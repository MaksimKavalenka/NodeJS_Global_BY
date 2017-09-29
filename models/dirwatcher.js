import chokidar from 'chokidar';
import EventEmitter from 'events';
import { logger } from '../models';

export default class DirWatcher extends EventEmitter {
  watch(path, delay) {
    const watcher = chokidar.watch(path, {
      persistent: true,
      ignored: '**/*.txt',
      usePolling: true,
      binaryInterval: delay,
    });

    watcher
      .on('add', (filePath) => {
        logger.log('debug', `${filePath} has been added`);
        this.emit('dirwatcher:changed', filePath);
      });
    watcher
      .on('change', (filePath) => {
        logger.log('debug', `${filePath} has been changed`);
        this.emit('dirwatcher:changed', filePath);
      });
  }
}

import chokidar from 'chokidar';
import EventEmitter from 'events';
import { logger } from '../models';

export class DirWatcher extends EventEmitter {
  watch(path, delay) {
    const watcher = chokidar.watch(path, {
      persistent: true,
      ignored: '*.txt',
      usePolling: true,
      binaryInterval: delay,
    });

    watcher
      .on('change', (filePath) => {
        logger.log('debug', `${filePath} has been changed`);
        this.emit('dirwatcher:changed', filePath);
      });
  }
}

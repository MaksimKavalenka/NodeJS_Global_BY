import fs from 'fs';
import http from 'http';
import path from 'path';
import split from 'split';
import through from 'through2';
import config from '../../config/config.json';
import { logger } from '../../middlewares';

function replaceMessage() {
  const bodyFunc = function body(buffer, encoding, next) {
    this.push(buffer.toString().replace(/{message}/gi, 'It\'s the real message text'));
    next();
  };

  const endFunc = function end(next) {
    next();
  };

  return through.obj(bodyFunc, endFunc);
}

export default function createHtmlServer(port) {
  http.createServer((req, res) => {
    const index = path.join(__dirname, '', 'index.html');
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    fs.createReadStream(index).pipe(split()).pipe(replaceMessage()).pipe(res);
  }).listen(port, () => logger.info(`HTML ${config.server_listening} ${port}!`));
}

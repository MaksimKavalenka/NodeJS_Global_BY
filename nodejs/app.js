const express = require('express');
const fs = require('fs');
const path = require('path');
const SwaggerExpress = require('swagger-express-mw');

const app = express();
const config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  app.use('/swagger', express.static(path.join(__dirname, 'dist')));

  const port = process.env.PORT || 10010;

  app.get('/swagger.yaml', (req, res) => {
    const index = path.join(__dirname, 'api/swagger/swagger.yaml');
    res.writeHead(200, {
      'Content-Type': 'text/yaml',
    });
    fs.createReadStream(index).pipe(res);
  });

  app.listen(port);
});

module.exports = app; // for testing

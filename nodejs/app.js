const express = require('express');
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
  app.use('/swagger.yaml', express.static(path.join(__dirname, 'api/swagger/swagger.yaml')));

  const port = process.env.PORT || 10010;
  app.listen(port);
});

module.exports = app; // for testing

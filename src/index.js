import util from 'util';
import app from './app';
import { CityController, CredentialsController, ProductController, ReviewController, UserController } from './controllers';
import { ErrorHandler } from './helpers';
import initLocale from './lang';
import { cityServer, echoServer, htmlServer, jsonServer, plainTextServer, initPassport, connectors, logger } from './middlewares';

const port = process.env.PORT || 8090;

initLocale();
initPassport();

(async () => {
  try {
    await connectors.MONGO.connect();

    CityController.addCity('Brest', 'Belarus', false, 52.097621, 23.734050);
    CityController.addCity('Gomel', 'Belarus', false, 52.2630, 30.5900);
    CityController.addCity('Minsk', 'Belarus', true, 53.5500, 27.3300);

    ErrorHandler.handleFunc(async () => {
      const user = await UserController.addUser('Maks', 'admin@node.com');
      await CredentialsController.addCredentials(user._id, 'admin', 'node123');
    });
    ErrorHandler.handleFunc(async () => {
      const product = await ProductController.addProduct('1', 'name1', 'brand1,', 'company1', 12.54, 'isbn1');
      await ReviewController.addReview('11', product._id, 'author11,', 'text11');
      await ReviewController.addReview('12', product._id, 'author12,', 'text12');
      await ReviewController.addReview('13', product._id, 'author13,', 'text13');
    });
    ErrorHandler.handleFunc(async () => {
      const product = await ProductController.addProduct('2', 'name2', 'brand2,', 'company2', 32.54, 'isbn2');
      await ReviewController.addReview('21', product._id, 'author21,', 'text21');
      await ReviewController.addReview('22', product._id, 'author22,', 'text22');
      await ReviewController.addReview('23', product._id, 'author23,', 'text23');
    });
    ErrorHandler.handleFunc(async () => {
      const product = await ProductController.addProduct('3', 'name3', 'brand3,', 'company3', 52.54, 'isbn3');
      await ReviewController.addReview('31', product._id, 'author31,', 'text31');
      await ReviewController.addReview('32', product._id, 'author32,', 'text32');
      await ReviewController.addReview('33', product._id, 'author33,', 'text33');
    });

    app.listen(port, () => logger.info(util.format(__('server_listening'), 'App', port)));
  } catch (err) {
    logger.error(err);
  }
})();

plainTextServer(8091);
htmlServer(8092);
jsonServer(8093);
echoServer(8094);
cityServer(8095);

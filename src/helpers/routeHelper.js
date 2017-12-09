import util from 'util';
import { CityController, CredentialsController, ProductController, ReviewController, UserController } from '../controllers';
import { ResponseHandler } from '../helpers';
import { ExpressMiddleware, JWT } from '../middlewares';

export class CityRouteUtils {
  static async addCity(req, res) {
    const city = await CityController.addCity(
      req.body.name, req.body.country, req.body.capital,
      req.body.lat, req.body.long,
    );
    ExpressMiddleware.sendResponse(res, 200, city);
  }

  static async getCity(req, res) {
    try {
      const city = await CityController.getCity(req.params.id);
      if (city) {
        ExpressMiddleware.sendResponse(res, 200, city);
      } else {
        ExpressMiddleware.sendResponse(res, 404, util.format(locale('city_not_found'), req.params.id));
      }
    } catch (error) {
      ExpressMiddleware.sendResponse(res, 404, util.format(locale('city_not_found'), req.params.id));
    }
  }

  static async getCities(req, res) {
    const cities = await CityController.getCities();
    ExpressMiddleware.sendResponse(res, 200, cities);
  }

  static async updateCity(req, res) {
    await CityController.updateCity(
      req.params.id, req.body.name, req.body.country,
      req.body.capital, req.body.lat, req.body.long,
    );
    const city = await CityController.getCity(req.params.id);
    ExpressMiddleware.sendResponse(res, 200, city);
  }

  static async deleteCity(req, res) {
    const city = await CityController.deleteCity(req.params.id);
    ResponseHandler.mongoResponse(res, city.result, 'city', req.params.id);
  }
}

export class CredentialsRouteUtils {
  static async verifyCredentials(req, res) {
    const creds = await CredentialsController.verifyCredentials(req.body.login, req.body.password);
    if (creds) {
      const user = await UserController.getUser(creds._id);
      const data = {
        user: {
          username: user.name,
          email: user.email,
        },
        token: JWT.generateJwt(user.toObject()),
      };
      ExpressMiddleware.sendResponse(res, 200, data);
    } else {
      ExpressMiddleware.sendResponse(res, 403, locale('auth_failure'));
    }
  }

  static verifyCredentialsPassport(req, res) {
    const data = {
      user: req.user,
      token: JWT.generateJwt(req.user),
    };
    ExpressMiddleware.sendResponse(res, 200, data);
  }

  static verifyCredentialsPassportSocial(req, res) {
    const data = req.user;
    ExpressMiddleware.sendResponse(res, 200, data);
  }
}

export class ProductRouteUtils {
  static async addProduct(req, res) {
    try {
      const product = await ProductController.addProduct(
        req.body._id, req.body.name, req.body.brand,
        req.body.company, req.body.price, req.body.isbn,
      );
      ExpressMiddleware.sendResponse(res, 200, product);
    } catch (err) {
      ExpressMiddleware.sendResponse(res, 409, util.format(locale('product_exists'), req.body._id));
    }
  }

  static async getProduct(req, res) {
    const product = await ProductController.getProduct(req.params.id);
    if (product) {
      ExpressMiddleware.sendResponse(res, 200, product);
    } else {
      ExpressMiddleware.sendResponse(res, 404, util.format(locale('product_not_found'), req.params.id));
    }
  }

  static async getProducts(req, res) {
    const products = await ProductController.getProducts();
    ExpressMiddleware.sendResponse(res, 200, products);
  }

  static async deleteProduct(req, res) {
    const product = await ProductController.deleteProduct(req.params.id);
    ResponseHandler.mongoResponse(res, product.result, 'product', req.params.id);
  }
}

export class ReviewRouteUtils {
  static async getProductReviews(req, res) {
    const reviews = await ReviewController.getProductReviews(req.params.id);
    ExpressMiddleware.sendResponse(res, 200, reviews);
  }
}

export class UserRouteUtils {
  static async getUsers(req, res) {
    const users = await UserController.getUsers();
    ExpressMiddleware.sendResponse(res, 200, users);
  }

  static async deleteUser(req, res) {
    const user = await UserController.deleteUser(req.params.id);
    await CredentialsController.deleteCredentials(req.params.id);
    ResponseHandler.mongoResponse(res, user.result, 'user', req.params.id);
  }
}

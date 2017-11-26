import util from 'util';
import { CredentialsController, ProductController, ReviewController, UserController } from '../controllers';
import { ExpressMiddleware, JWT } from '../middlewares';

export class CredentialsRouteUtils {
  static async verifyCredentials(req, res) {
    const creds = await CredentialsController.verifyCredentials(req.body.login, req.body.password);
    if (creds) {
      const user = await UserController.getUserById(creds.userId);
      const data = {
        user: {
          username: user.name,
          email: user.email,
        },
        token: JWT.generateJwt(user.dataValues),
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
        req.body.id, req.body.name, req.body.brand,
        req.body.company, req.body.price, req.body.isbn,
      );
      ExpressMiddleware.sendResponse(res, 200, product);
    } catch (err) {
      ExpressMiddleware.sendResponse(res, 409, util.format(locale('product_exists'), req.body.id));
    }
  }

  static async getProduct(req, res, next) {
    req.product = await ProductController.getProductById(req.params.id);
    next();
  }

  static async getProducts(req, res) {
    const products = await ProductController.getProducts();
    res.json(products);
  }

  static sendProduct(req, res) {
    if (req.product) {
      res.json(req.product);
    } else {
      ExpressMiddleware.sendResponse(res, 404, util.format(locale('product_not_found'), req.params.id));
    }
  }
}

export class ReviewRouteUtils {
  static async getProductReviews(req, res) {
    const reviews = await ReviewController.getProductReviews(req.params.id);
    res.json(reviews);
  }
}

export class UserRouteUtils {
  static async getUsers(req, res) {
    const users = await UserController.getUsers();
    res.json(users);
  }
}

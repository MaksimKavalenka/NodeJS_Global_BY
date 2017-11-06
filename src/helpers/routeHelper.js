import { CredentialsController, ProductController, ReviewController, UserController } from '../controllers';
import { JWT } from '../middlewares';

export class CredentialsRouteUtils {
  static verifyCredentials(req, res) {
    const creds = CredentialsController.verifyCredentials(req.body.login, req.body.password);
    if (creds) {
      const user = UserController.getUserById(creds.userId);
      const jwt = JWT.generateJwt(user);
      res.json(jwt);
    } else {
      res.status(403).send({ success: false, message: __('auth_failure') });
    }
  }
}

export class ProductRouteUtils {
  static addProduct(req, res) {
    const product = ProductController.addProduct(req.body.name, req.body.brand, req.body.price);
    res.json(product);
  }

  static getProduct(req, res, next) {
    req.product = ProductController.getProductById(req.params.id);
    next();
  }

  static getProducts(req, res) {
    const products = ProductController.getProducts();
    res.json(products);
  }

  static sendProduct(req, res) {
    if (req.product) {
      res.json(req.product);
    } else {
      res.status(404).send({ success: false, message: `${__('product_not_found')}: ${req.params.id}` });
    }
  }
}

export class ReviewRouteUtils {
  static getProductReviews(req, res) {
    const reviews = ReviewController.getProductReviews(req.params.id);
    res.json(reviews);
  }
}

export class UserRouteUtils {
  static getUsers(req, res) {
    const users = UserController.getUsers();
    res.json(users);
  }
}

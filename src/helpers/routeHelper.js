import config from '../config/config.json';
import { ProductController, ReviewController, UserController } from '../controllers';

export class ProductRouteUtils {
  static addProduct(req, res) {
    const product = ProductController.addProduct(req.body.name, req.body.brand, req.body.price);
    res.json(product);
  }

  static getProduct(req, res, next) {
    const product = ProductController.getProductById(req.params.id);
    if (product) {
      req.product = product;
      next();
    } else {
      next('route');
    }
  }

  static getProducts(req, res) {
    const products = ProductController.getProducts();
    res.json(products);
  }

  static sendProduct(req, res) {
    res.json(req.product);
  }

  static productNotFound(req, res) {
    res.status(404);
    res.end(`${config.product_not_found}: ${req.params.id}`);
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

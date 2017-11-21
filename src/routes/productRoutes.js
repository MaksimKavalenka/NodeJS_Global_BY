import express from 'express';
import { ProductRouteUtils, ReviewRouteUtils } from '../helpers';
import { Validator, schema } from '../middlewares';

const router = express.Router();

const path = { ROOT: '/products' };
path.ADD_PRODUCT = path.ROOT;
path.GET_PRODUCT = `${path.ROOT}/:id`;
path.GET_PRODUCTS = path.ROOT;
path.GET_PRODUCT_REVIEWS = `${path.ROOT}/:id/reviews`;
path.DELETE_PRODUCT = `${path.ROOT}/:id`;

router.route(path.ADD_PRODUCT)
  .post(Validator.validateSchema(schema.PRODUCT_SCHEMA), ProductRouteUtils.addProduct);

router.route(path.GET_PRODUCT)
  .get(ProductRouteUtils.getProduct);

router.route(path.GET_PRODUCTS)
  .get(ProductRouteUtils.getProducts);

router.route(path.GET_PRODUCT_REVIEWS)
  .get(ReviewRouteUtils.getProductReviews);

router.route(path.DELETE_PRODUCT)
  .delete(ProductRouteUtils.deleteProduct);

module.exports = router;

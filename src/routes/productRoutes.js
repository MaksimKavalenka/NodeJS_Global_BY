import express from 'express';
import { ProductRouteUtils, ReviewRouteUtils } from '../helpers';

const router = express.Router();

const path = { ROOT: '/products' };
path.ADD_PRODUCT = path.ROOT;
path.GET_PRODUCT = `${path.ROOT}/:id`;
path.GET_PRODUCTS = path.ROOT;
path.GET_PRODUCT_REVIEWS = `${path.ROOT}/:id/reviews`;

router.route(path.ADD_PRODUCT)
  .post(ProductRouteUtils.addProduct);

router
  .get(`${path.GET_PRODUCT}`, ProductRouteUtils.getProduct, ProductRouteUtils.sendProduct)
  .get(`${path.GET_PRODUCT}`, ProductRouteUtils.productNotFound);

router
  .get(`${path.GET_PRODUCTS}`, ProductRouteUtils.getProducts);

router
  .get(`${path.GET_PRODUCT_REVIEWS}`, ReviewRouteUtils.getProductReviews);

module.exports = router;

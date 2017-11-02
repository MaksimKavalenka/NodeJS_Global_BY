import _ from 'lodash';
import { Product } from '../models';

const products = [];

export default class ProductController {
  static addProduct(name, brand, price) {
    const product = new Product(name, brand, price);
    products.push(product);
    return product;
  }

  static getProductById(id) {
    return _.find(products, product => product.id === id);
  }

  static getProducts() {
    return products;
  }
}

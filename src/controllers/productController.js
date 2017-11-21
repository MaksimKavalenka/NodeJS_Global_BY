import { Product } from '../models';

export default class ProductController {
  static addProduct(_id, name, brand, company, price, isbn) {
    const product = new Product({
      _id, name, brand, company, price, isbn,
    });
    return product.save();
  }

  static getProduct(id) {
    return Product.findById(id);
  }

  static getProducts() {
    return Product.find();
  }

  static deleteProduct(_id) {
    return Product.remove({ _id });
  }
}

import { Product, Review } from '../models';

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

  static async deleteProduct(_id) {
    await Review.remove({ productId: _id });
    return Product.remove({ _id });
  }
}

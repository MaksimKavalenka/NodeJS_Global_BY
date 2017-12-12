import sequelize from 'sequelize';
import Product from '../database/models/product';
import { client } from '../middlewares';

const productModel = Product(client, sequelize.DataTypes);

export default class ProductController {
  static addProduct(id, name, brand, company, price, isbn) {
    return productModel.create({
      id, name, brand, company, price, isbn,
    });
  }

  static getProductById(id) {
    return productModel.find({ where: { id } });
  }

  static getProducts() {
    return productModel.findAll();
  }
}

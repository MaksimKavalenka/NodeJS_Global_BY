import sequelize from 'sequelize';
import Review from '../database/models/review';
import { connectors } from '../middlewares';

const reviewModel = Review(connectors.POSTGRES.client, sequelize.DataTypes);

export default class ReviewController {
  static addReview(reviewId, productId, author, text) {
    return reviewModel.create({
      reviewId, productId, author, text,
    });
  }

  static getReviewById(id) {
    return reviewModel.find({ where: { id } });
  }

  static getProductReviews(productId) {
    return reviewModel.findAll({ where: { productId } });
  }

  static getReviews() {
    return reviewModel.findAll();
  }
}

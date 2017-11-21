import { Review } from '../models';

export default class ReviewController {
  static addReview(_id, productId, author, text) {
    const review = new Review({
      _id, productId, author, text,
    });
    return review.save();
  }

  static getReview(id) {
    return Review.findById(id);
  }

  static getProductReviews(productId) {
    return Review.find({ productId });
  }

  static getReviews() {
    return Review.find();
  }
}

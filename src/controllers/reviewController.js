import _ from 'lodash';
import { Review } from '../models';

const reviews = [];

export default class ReviewController {
  static addReview(productId, author, text) {
    const review = new Review(productId, author, text);
    reviews.push(review);
    return review;
  }

  static getReviewById(id) {
    return _.find(reviews, review => (review.id === id));
  }

  static getProductReviews(productId) {
    return _.filter(reviews, review => (review.productId === productId));
  }

  static getReviews() {
    return reviews;
  }
}

import _ from 'underscore';

const reviews = [];

export default class ReviewController {
  static getProductReviews(productId) {
    return _.filter(reviews, review => review.productId === productId);
  }
}

import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  _id: { type: String },
  productId: { type: String, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  lastModifiedDate: Date,
}, {
  versionKey: false,
});

reviewSchema.pre('save', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});
reviewSchema.pre('update', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

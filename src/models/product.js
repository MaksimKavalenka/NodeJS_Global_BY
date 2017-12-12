import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  company: { type: String, required: true },
  price: { type: Number, required: true },
  isbn: { type: String, required: true },
  lastModifiedDate: Date,
}, {
  versionKey: false,
});

productSchema.pre('save', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});
productSchema.pre('update', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});
productSchema.pre('remove', function (next) {
  this.model.Review.remove({ productId: this._id });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

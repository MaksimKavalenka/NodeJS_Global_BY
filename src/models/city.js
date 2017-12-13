import mongoose from 'mongoose';

const citySchema = mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  capital: { type: Boolean, default: false },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  lastModifiedDate: Date,
}, {
  versionKey: false,
});

citySchema.pre('save', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});
citySchema.pre('update', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});

const City = mongoose.model('City', citySchema);

module.exports = City;

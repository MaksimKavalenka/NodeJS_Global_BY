import mongoose from 'mongoose';

const citySchema = mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  capital: { type: Boolean, default: false },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  lastModifiedDate: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

const City = mongoose.model('City', citySchema);

module.exports = City;

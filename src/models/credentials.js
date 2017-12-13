import mongoose from 'mongoose';

const credentialsSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastModifiedDate: Date,
}, {
  versionKey: false,
});

credentialsSchema.pre('save', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});
credentialsSchema.pre('update', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});

const Credentials = mongoose.model('Credentials', credentialsSchema);

module.exports = Credentials;

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  lastModifiedDate: Date,
}, {
  versionKey: false,
});

userSchema.pre('save', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});
userSchema.pre('update', function (next) {
  this.update({}, { $set: { lastModifiedDate: new Date() } });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

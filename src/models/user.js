import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  lastModifiedDate: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

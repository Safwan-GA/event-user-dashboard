const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true }, // Firebase User ID
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }, // Optional: Track user registration date
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;

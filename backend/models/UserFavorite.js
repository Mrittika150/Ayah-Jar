const mongoose = require('mongoose');

const UserFavoriteSchema = new mongoose.Schema({
  
  deviceId: {
    type: String,
    required: true
  },
  ayahNumber: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    maxlength: 500
  },
  emotion: {
    type: String,
    enum: ['sad', 'anxious', 'happy', 'grateful', 'lonely', 'stressed', 'hopeless', 'peaceful', 'random']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserFavoriteSchema.index({ deviceId: 1, ayahNumber: 1 }, { unique: true });

module.exports = mongoose.model('UserFavorite', UserFavoriteSchema);
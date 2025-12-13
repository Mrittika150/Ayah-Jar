const mongoose = require('mongoose');

const AyahSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  surahNumber: {
    type: Number,
    required: true
  },
  numberInSurah: {
    type: Number,
    required: true
  },
  arabicText: {
    type: String,
    required: true
  },
  englishTranslation: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String
  },
  themes: [{
    type: String,
    enum: ['patience', 'gratitude', 'hope', 'forgiveness', 'mercy', 'guidance', 'peace', 'comfort']
  }],
  emotions: [{
    type: String,
    enum: ['sad', 'anxious', 'happy', 'grateful', 'lonely', 'stressed', 'hopeless', 'peaceful']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
AyahSchema.index({ themes: 1 });
AyahSchema.index({ emotions: 1 });
AyahSchema.index({ surahNumber: 1, numberInSurah: 1 });

module.exports = mongoose.model('Ayah', AyahSchema);
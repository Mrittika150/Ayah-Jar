// backend/routes/ayahs.js

const express = require('express');
const router = express.Router();
const {
  getAyahByEmotion,
  getAyah,
  searchAyahs,
  getEmotions
} = require('../controllers/ayahController');

// Get all available emotions
router.get('/emotions', getEmotions);

// Get random ayah by emotion
router.get('/emotion/:emotion', getAyahByEmotion);

// Search ayahs
router.get('/search', searchAyahs);

// Get specific ayah
router.get('/:surah/:ayah', getAyah);

module.exports = router;
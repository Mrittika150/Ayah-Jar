// backend/controllers/ayahController.js

const quranService = require('../services/quranService');

// @desc    Get random ayah by emotion
// @route   GET /api/ayahs/emotion/:emotion
// @access  Public
exports.getAyahByEmotion = async (req, res) => {
  try {
    const { emotion } = req.params;
    
    const validEmotions = quranService.getAvailableEmotions();
    if (!validEmotions.includes(emotion.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Invalid emotion. Valid emotions are: ${validEmotions.join(', ')}`
      });
    }

    const verse = await quranService.getVerseByEmotion(emotion);
    
    res.status(200).json({
      success: true,
      data: verse
    });
  } catch (error) {
    console.error('Error in getAyahByEmotion:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ayah'
    });
  }
};

// @desc    Get specific ayah
// @route   GET /api/ayahs/:surah/:ayah
// @access  Public
exports.getAyah = async (req, res) => {
  try {
    const { surah, ayah } = req.params;
    
    if (!surah || !ayah) {
      return res.status(400).json({
        success: false,
        error: 'Surah and ayah numbers are required'
      });
    }

    const verse = await quranService.getVerse(surah, ayah);
    
    res.status(200).json({
      success: true,
      data: verse
    });
  } catch (error) {
    console.error('Error in getAyah:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ayah'
    });
  }
};

// @desc    Search ayahs by keyword
// @route   GET /api/ayahs/search?q=keyword&lang=en
// @access  Public
exports.searchAyahs = async (req, res) => {
  try {
    const { q: keyword, lang = 'en' } = req.query;
    
    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: 'Search keyword is required'
      });
    }

    const results = await quranService.searchVerses(keyword, lang);
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Error in searchAyahs:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
};

// @desc    Get available emotions
// @route   GET /api/ayahs/emotions
// @access  Public
exports.getEmotions = (req, res) => {
  try {
    const emotions = quranService.getAvailableEmotions();
    
    res.status(200).json({
      success: true,
      data: emotions
    });
  } catch (error) {
    console.error('Error in getEmotions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch emotions'
    });
  }
};
module.exports = {
  EMOTIONS: ['sad', 'anxious', 'happy', 'grateful', 'lonely', 'stressed', 'hopeless', 'peaceful', 'random'],
  
  THEMES: ['patience', 'gratitude', 'hope', 'forgiveness', 'mercy', 'guidance', 'peace', 'comfort'],
  
  DEFAULT_AYAHS: [
    { reference: '1:1-7', name: 'Al-Fatihah', description: 'The Opening' },
    { reference: '2:255', name: 'Ayatul Kursi', description: 'The Verse of the Throne' },
    { reference: '36:1-12', name: 'Ya-Sin', description: 'The Heart of the Quran' },
    { reference: '55:1-13', name: 'Ar-Rahman', description: 'The Most Merciful' },
    { reference: '67:1-5', name: 'Al-Mulk', description: 'The Sovereignty' },
    { reference: '112:1-4', name: 'Al-Ikhlas', description: 'The Sincerity' },
  ],
  
  PRAYER_TIMES_API: 'http://api.aladhan.com/v1/timingsByCity',
  
  ERROR_MESSAGES: {
    INVALID_EMOTION: 'Invalid emotion specified',
    AYAH_NOT_FOUND: 'Ayah not found',
    API_ERROR: 'Error fetching from Quran API',
    VALIDATION_ERROR: 'Validation error'
  }
};
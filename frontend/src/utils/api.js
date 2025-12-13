import axios from 'axios';

// Use relative path for proxy, or direct localhost
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : '/api'; // Using proxy

const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000, // Reduced timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    
    // Return mock data if API fails
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.log('⚠️ Using mock data due to network error');
      // Return a mock response
      return Promise.resolve({
        data: {
          success: true,
          data: getMockAyah('random'),
          message: 'Using offline data'
        }
      });
    }
    
    return Promise.reject(error);
  }
);

// Mock data for offline use
const getMockAyah = (emotion) => {
  const mockAyahs = {
    sad: {
      arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
      translation: 'Indeed, with hardship comes ease.',
      surah: { number: 94, name: 'Ash-Sharh', arabicName: 'الشرح' },
      numberInSurah: 5,
      description: 'Allah promises ease after every difficulty'
    },
    anxious: {
      arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُمْ بِذِكْرِ اللَّهِ',
      translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah.',
      surah: { number: 13, name: 'Ar-Ra\'d', arabicName: 'الرعد' },
      numberInSurah: 28,
      description: 'Remembrance of Allah brings peace to the heart'
    },
    random: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      surah: { number: 1, name: 'Al-Fatihah', arabicName: 'الفاتحة' },
      numberInSurah: 1,
      description: 'Start everything with the name of Allah'
    }
  };
  
  return mockAyahs[emotion] || mockAyahs.random;
};

export const ayahAPI = {
  getRandomAyah: async () => {
    try {
      const response = await api.get('/ayahs/random');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for random ayah');
      return {
        success: true,
        data: getMockAyah('random'),
        message: 'Offline mode'
      };
    }
  },

  getAyahByEmotion: async (emotion) => {
    try {
      const response = await api.get(`/ayahs/emotion/${emotion}`);
      return response.data;
    } catch (error) {
      console.warn(`Using mock data for ${emotion} ayah`);
      return {
        success: true,
        data: getMockAyah(emotion),
        message: 'Offline mode'
      };
    }
  },

  // Simple favorites (local storage only)
  saveFavorite: async (deviceId, ayahNumber, notes = '', emotion = '') => {
    try {
      const response = await api.post('/ayahs/favorites', {
        deviceId,
        ayahNumber,
        notes,
        emotion
      });
      return response.data;
    } catch (error) {
      // Save to localStorage as fallback
      const favorites = JSON.parse(localStorage.getItem('ayahJar_favorites') || '[]');
      favorites.push({
        deviceId,
        ayahNumber,
        notes,
        emotion,
        savedAt: new Date().toISOString()
      });
      localStorage.setItem('ayahJar_favorites', JSON.stringify(favorites));
      
      return {
        success: true,
        message: 'Saved locally',
        data: { deviceId, ayahNumber, notes, emotion }
      };
    }
  }
};

export default api;
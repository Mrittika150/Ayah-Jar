// frontend/src/services/ayahService.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AyahService {
  // Get ayah by emotion
  async getAyahByEmotion(emotion) {
    try {
      const response = await fetch(`${API_URL}/ayahs/emotion/${emotion}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch ayah');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching ayah by emotion:', error);
      throw error;
    }
  }

  // Get specific ayah
  async getAyah(surah, ayah) {
    try {
      const response = await fetch(`${API_URL}/ayahs/${surah}/${ayah}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch ayah');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching ayah:', error);
      throw error;
    }
  }

  // Search ayahs
  async searchAyahs(keyword, language = 'en') {
    try {
      const response = await fetch(
        `${API_URL}/ayahs/search?q=${encodeURIComponent(keyword)}&lang=${language}`
      );
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Search failed');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error searching ayahs:', error);
      throw error;
    }
  }

  // Get available emotions
  async getEmotions() {
    try {
      const response = await fetch(`${API_URL}/ayahs/emotions`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch emotions');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching emotions:', error);
      throw error;
    }
  }
}

export default new AyahService();
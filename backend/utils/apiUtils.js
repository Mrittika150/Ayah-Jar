const axios = require('axios');

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

// Local ayah database for fallback
const LOCAL_AYAH_DATABASE = {
  sad: [
    {
      arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
      translation: 'Indeed, with hardship comes ease.',
      surahNumber: 94,
      surahEnglish: 'Ash-Sharh',
      surahArabic: 'الشرح',
      ayahNumber: 5,
      description: 'Allah promises ease after every difficulty'
    },
    {
      arabic: 'وَلَنَبْلُوَنَّكُمْ بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ',
      translation: 'And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient.',
      surahNumber: 2,
      surahEnglish: 'Al-Baqarah',
      surahArabic: 'البقرة',
      ayahNumber: 155,
      description: 'Patience in times of trial is rewarded'
    }
  ],
  anxious: [
    {
      arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُمْ بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
      surahNumber: 13,
      surahEnglish: 'Ar-Ra\'d',
      surahArabic: 'الرعد',
      ayahNumber: 28,
      description: 'Remembrance of Allah brings peace to the heart'
    },
    {
      arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
      translation: 'And whoever fears Allah - He will make for him a way out.',
      surahNumber: 65,
      surahEnglish: 'At-Talaq',
      surahArabic: 'الطلاق',
      ayahNumber: 2,
      description: 'Allah provides solutions for those who fear Him'
    }
  ],
  happy: [
    {
      arabic: 'قُلْ بِفَضْلِ اللَّهِ وَبِرَحْمَتِهِ فَبِذَٰلِكَ فَلْيَفْرَحُوا هُوَ خَيْرٌ مِّمَّا يَجْمَعُونَ',
      translation: 'Say, "In the bounty of Allah and in His mercy - in that let them rejoice; it is better than what they accumulate."',
      surahNumber: 10,
      surahEnglish: 'Yunus',
      surahArabic: 'يونس',
      ayahNumber: 58,
      description: 'Rejoice in Allah\'s blessings, not worldly possessions'
    }
  ],
  grateful: [
    {
      arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
      translation: 'If you are grateful, I will surely increase you.',
      surahNumber: 14,
      surahEnglish: 'Ibrahim',
      surahArabic: 'ابراهيم',
      ayahNumber: 7,
      description: 'Gratitude brings increase from Allah'
    }
  ],
  random: [
    {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      surahNumber: 1,
      surahEnglish: 'Al-Fatihah',
      surahArabic: 'الفاتحة',
      ayahNumber: 1,
      description: 'Start everything with the name of Allah'
    },
    {
      arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation: 'Praise be to Allah, Lord of the worlds.',
      surahNumber: 1,
      surahEnglish: 'Al-Fatihah',
      surahArabic: 'الفاتحة',
      ayahNumber: 2,
      description: 'All praise belongs to Allah alone'
    }
  ]
};

class QuranAPI {
  static async getAyah(surah, ayah) {
    try {
      const response = await axios.get(
        `${QURAN_API_BASE}/ayah/${surah}:${ayah}`,
        { timeout: 5000 } // 5 second timeout
      );
      return response.data;
    } catch (error) {
      console.warn('⚠️ Quran API failed, using local data');
      // Return local fallback data
      return this.getLocalAyah(surah, ayah);
    }
  }

  static async getRandomAyah() {
    try {
      // Try external API first
      const response = await axios.get(
        `${QURAN_API_BASE}/ayah/random`,
        { timeout: 5000 }
      );
      return response.data;
    } catch (error) {
      console.warn('⚠️ Random ayah API failed, using local data');
      // Return random from local database
      return this.getRandomLocalAyah();
    }
  }

  static async getAyahByEmotion(emotion) {
    try {
      // For now, use local data
      return this.getLocalAyahByEmotion(emotion);
    } catch (error) {
      console.error('Error getting ayah by emotion:', error);
      throw error;
    }
  }

  static getLocalAyahByEmotion(emotion) {
    const emotionKey = emotion.toLowerCase();
    const ayahList = LOCAL_AYAH_DATABASE[emotionKey] || LOCAL_AYAH_DATABASE.random;
    const randomIndex = Math.floor(Math.random() * ayahList.length);
    const ayah = ayahList[randomIndex];
    
    return {
      success: true,
      data: {
        arabic: ayah.arabic,
        translation: ayah.translation,
        surah: {
          number: ayah.surahNumber,
          name: ayah.surahEnglish,
          arabicName: ayah.surahArabic
        },
        numberInSurah: ayah.ayahNumber,
        description: ayah.description,
        audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.surahNumber}_${ayah.ayahNumber}.mp3`
      }
    };
  }

  static getRandomLocalAyah() {
    // Combine all emotions
    const allAyahs = Object.values(LOCAL_AYAH_DATABASE).flat();
    const randomIndex = Math.floor(Math.random() * allAyahs.length);
    const ayah = allAyahs[randomIndex];
    
    return {
      data: [
        { 
          text: ayah.arabic,
          surah: {
            number: ayah.surahNumber,
            englishName: ayah.surahEnglish,
            name: ayah.surahArabic
          },
          numberInSurah: ayah.ayahNumber,
          number: ayah.surahNumber * 1000 + ayah.ayahNumber // Generate unique number
        },
        { 
          text: ayah.translation 
        }
      ]
    };
  }

  static getLocalAyah(surah, ayah) {
    // Find matching ayah in local database
    const allAyahs = Object.values(LOCAL_AYAH_DATABASE).flat();
    const foundAyah = allAyahs.find(a => a.surahNumber === surah && a.ayahNumber === ayah);
    
    if (foundAyah) {
      return {
        data: [
          { 
            text: foundAyah.arabic,
            surah: {
              number: foundAyah.surahNumber,
              englishName: foundAyah.surahEnglish,
              name: foundAyah.surahArabic
            },
            numberInSurah: foundAyah.ayahNumber
          },
          { 
            text: foundAyah.translation 
          }
        ]
      };
    }
    
    // Return default if not found
    return {
      data: [
        { 
          text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          surah: {
            number: 1,
            englishName: 'Al-Fatihah',
            name: 'الفاتحة'
          },
          numberInSurah: 1
        },
        { 
          text: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' 
        }
      ]
    };
  }
}

module.exports = { QuranAPI, LOCAL_AYAH_DATABASE };
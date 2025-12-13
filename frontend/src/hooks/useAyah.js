// frontend/src/hooks/useAyah.js

import { useState, useCallback } from 'react';
import ayahService from '../services/ayahService';

export const useAyah = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ayah, setAyah] = useState(null);

  // Get ayah by emotion
  const fetchAyahByEmotion = useCallback(async (emotion) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ayahService.getAyahByEmotion(emotion);
      setAyah(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  // Get specific ayah
  const fetchAyah = useCallback(async (surah, ayahNumber) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ayahService.getAyah(surah, ayahNumber);
      setAyah(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  // Search ayahs
  const searchAyahs = useCallback(async (keyword, language = 'en') => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ayahService.searchAyahs(keyword, language);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  // Get available emotions
  const fetchEmotions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ayahService.getEmotions();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clear ayah
  const clearAyah = useCallback(() => {
    setAyah(null);
  }, []);

  return {
    loading,
    error,
    ayah,
    fetchAyahByEmotion,
    fetchAyah,
    searchAyahs,
    fetchEmotions,
    clearError,
    clearAyah
  };
};
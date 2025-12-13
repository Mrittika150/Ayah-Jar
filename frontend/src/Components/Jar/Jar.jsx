// frontend/src/components/Jar/Jar.jsx - WITH AUTO-SCROLL

import React, { useState, useRef, useEffect } from 'react';
import { useAyah } from '../../hooks/useAyah';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './Jar.css';

const Jar = () => {
  const { loading, error, ayah, fetchAyahByEmotion } = useAyah();
  const [selectedEmotion, setSelectedEmotion] = useState('happy');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const audioRef = useRef(null);
  const ayahCardRef = useRef(null); // Reference to the ayah card

  const emotions = [
    { value: 'sad', label: 'Sad', emoji: '😢', color: '#5C6BC0' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', color: '#EF5350' },
    { value: 'happy', label: 'Happy', emoji: '😊', color: '#66BB6A' },
    { value: 'grateful', label: 'Grateful', emoji: '🙏', color: '#FFA726' },
    { value: 'stressed', label: 'Stressed', emoji: '😓', color: '#AB47BC' },
    { value: 'hopeful', label: 'Hopeful', emoji: '✨', color: '#26C6DA' }
  ];

  // Auto-scroll to ayah card when ayah changes
  useEffect(() => {
    if (ayah && ayahCardRef.current) {
      // Small delay to let the card render fully
      setTimeout(() => {
        ayahCardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center', // Center the card in viewport
          inline: 'nearest'
        });
      }, 100);
    }
  }, [ayah]);

  const handleShakeJar = async () => {
    // Stop audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setAudioPlaying(false);
    }

    try {
      await fetchAyahByEmotion(selectedEmotion);
    } catch (err) {
      console.error('Error fetching ayah:', err);
    }
  };

  const toggleAudio = () => {
    if (!ayah?.audioUrl) {
      alert('Audio not available for this verse');
      return;
    }

    if (!audioRef.current) {
      // Create new audio element
      audioRef.current = new Audio(ayah.audioUrl);
      
      audioRef.current.addEventListener('loadstart', () => {
        setAudioLoading(true);
      });

      audioRef.current.addEventListener('canplay', () => {
        setAudioLoading(false);
      });

      audioRef.current.addEventListener('ended', () => {
        setAudioPlaying(false);
        audioRef.current = null;
      });

      audioRef.current.addEventListener('error', (e) => {
        setAudioLoading(false);
        setAudioPlaying(false);
        audioRef.current = null;
        console.error('Audio error:', e);
        alert('Failed to load audio. Please check your internet connection.');
      });
    }

    if (audioPlaying) {
      // Pause
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      // Play
      setAudioLoading(true);
      audioRef.current.play()
        .then(() => {
          setAudioPlaying(true);
          setAudioLoading(false);
        })
        .catch(err => {
          console.error('Play error:', err);
          setAudioLoading(false);
          alert('Failed to play audio. Please try again.');
        });
    }
  };

  return (
    <Container maxWidth="md" className="jar-container">
      <Box className="jar-header">
        <Typography variant="h3" className="jar-title">
          Ayah Jar
        </Typography>
        <Typography variant="subtitle1" className="jar-subtitle">
          Select your emotion and receive a comforting verse
        </Typography>
      </Box>

      {/* Emotion Selector */}
      <Box className="emotion-buttons">
        {emotions.map((emotion) => (
          <Button
            key={emotion.value}
            variant={selectedEmotion === emotion.value ? 'contained' : 'outlined'}
            onClick={() => setSelectedEmotion(emotion.value)}
            className="emotion-button"
            sx={{
              borderColor: emotion.color,
              color: selectedEmotion === emotion.value ? 'white' : emotion.color,
              backgroundColor: selectedEmotion === emotion.value ? emotion.color : 'transparent',
              '&:hover': {
                backgroundColor: selectedEmotion === emotion.value ? emotion.color : `${emotion.color}20`,
                borderColor: emotion.color
              }
            }}
          >
            <span className="emotion-emoji">{emotion.emoji}</span>
            <span className="emotion-label">{emotion.label}</span>
          </Button>
        ))}
      </Box>

      {/* Shake Button */}
      <Box className="shake-button-container">
        <Button
          variant="contained"
          size="large"
          onClick={handleShakeJar}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ShuffleIcon />}
          className="shake-button"
        >
          {loading ? 'Opening Jar...' : 'SHAKE THE JAR'}
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
      )}

      {/* Ayah Display - WITH REF FOR AUTO-SCROLL */}
      {ayah && (
        <Card className="ayah-card" ref={ayahCardRef}>
          <CardContent className="ayah-content">
            {/* Arabic Text */}
            <Typography variant="h4" className="arabic-text">
              {ayah.arabicText}
            </Typography>

            {/* Translation */}
            <Typography variant="body1" className="translation-text">
              "{ayah.translation}"
            </Typography>

            {/* Reference */}
            <Typography variant="subtitle2" className="reference-text">
              — {ayah.reference}
            </Typography>

            {/* Audio Button */}
            {ayah.audioUrl && (
              <Box className="action-buttons">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={
                    audioLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : audioPlaying ? (
                      <PauseIcon />
                    ) : (
                      <PlayArrowIcon />
                    )
                  }
                  onClick={toggleAudio}
                  disabled={audioLoading}
                  className="audio-button"
                  sx={{
                    backgroundColor: '#2E7D32',
                    '&:hover': { backgroundColor: '#1B5E20' }
                  }}
                >
                  {audioLoading ? 'Loading Audio...' : audioPlaying ? 'Pause Recitation' : 'Listen to Recitation'}
                </Button>
              </Box>
            )}

            {/* Audio Status */}
            {ayah.audioUrl && audioPlaying && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Chip
                  icon={<VolumeUpIcon />}
                  label="Playing Recitation..."
                  color="success"
                  size="small"
                  className="audio-status"
                />
              </Box>
            )}

            {!ayah.audioUrl && (
              <Typography variant="caption" color="text.secondary" align="center" display="block" mt={2}>
                Audio not available for this verse
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Jar;
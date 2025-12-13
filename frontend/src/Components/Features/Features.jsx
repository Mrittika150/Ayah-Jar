import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TranslateIcon from '@mui/icons-material/Translate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <VolumeUpIcon className="feature-icon" />,
      title: 'Audio Recitation',
      description: 'Listen to beautiful recitations of each verse in authentic Arabic pronunciation'
    },
    {
      icon: <TranslateIcon className="feature-icon" />,
      title: 'Multiple Translations',
      description: 'Read verses in English translation for deeper understanding and reflection'
    },
    {
      icon: <FavoriteIcon className="feature-icon" />,
      title: 'Save Favorites',
      description: 'Bookmark verses that resonate with you and revisit them anytime'
    },
    {
      icon: <ShareIcon className="feature-icon" />,
      title: 'Share Wisdom',
      description: 'Share meaningful verses with friends and family to spread comfort'
    }
  ];

  return (
    <section className="features-section">
      <Container maxWidth="lg">
        <Typography variant="h2" className="features-title">
          Features
        </Typography>
        <Typography className="features-subtitle">
          Everything you need for a meaningful spiritual experience
        </Typography>
        
        <div className="features-container">
          {features.map((feature, index) => (
            <Box key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <Typography variant="h5" className="feature-title">
                {feature.title}
              </Typography>
              <Typography className="feature-description">
                {feature.description}
              </Typography>
            </Box>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
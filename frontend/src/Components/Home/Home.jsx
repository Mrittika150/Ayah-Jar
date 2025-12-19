import React from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Link } from 'react-router-dom';
import Features from '../Features/Features';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" className="hero-title">
                Find Comfort in Divine Words
              </Typography>
              <Typography variant="h5" className="hero-subtitle">
                A digital jar filled with Quranic verses for every emotion
              </Typography>
              <Box className="hero-buttons">
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/jar"
                  startIcon={<ShuffleIcon />}
                  className="jar-button"
                >
                  Open the Jar
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="jar-visual">
                <div className="jar-illustration">
                  {/* Jar Lid */}
                  <div className="jar-lid"></div>
                  
                  {/* Glass Jar Body */}
                  <div className="jar-glass">
                    {/* Floating paper pieces with icons */}
                    <div className="jar-papers">
                      <div className="paper-piece" style={{'--rotation': '-15deg'}}>
                        <img src="scroll.png" alt="scroll" className="paper-icon" />
                      </div>
                      <div className="paper-piece" style={{'--rotation': '10deg'}}>
                        <img src="star.png" alt="star" className="paper-icon" />
                      </div>
                      <div className="paper-piece" style={{'--rotation': '-8deg'}}>
                        <img src="book.png" alt="book" className="paper-icon" />
                      </div>
                      <div className="paper-piece" style={{'--rotation': '12deg'}}>
                        <img src="hands.png" alt="praying hands" className="paper-icon" />
                      </div>
                      <div className="paper-piece" style={{'--rotation': '-5deg'}}>
                        <img src="heart.png" alt="heart" className="paper-icon" />
                      </div>
                    </div>
                    
                    {/* Label on jar */}
                    <div className="jar-label">
                      <Typography className="jar-label-text">
                        Quranic Wisdom
                      </Typography>
                      <Typography className="jar-label-subtext">
                        Verses of Comfort & Guidance
                      </Typography>
                    </div>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <Container maxWidth="lg">
          <Typography variant="h2" className="section-title">
            How It Works
          </Typography>
          <div className="steps-container">
            <Box className="step-card">
              <div className="step-number">1</div>
              <EmojiEmotionsIcon className="step-icon" />
              <Typography variant="h5" className="step-title">
                Choose Emotion
              </Typography>
              <Typography className="step-description">
                Select how you're feeling - sad, anxious, happy, or grateful
              </Typography>
            </Box>
            
            <Box className="step-card">
              <div className="step-number">2</div>
              <ShuffleIcon className="step-icon" />
              <Typography variant="h5" className="step-title">
                Shake the Jar
              </Typography>
              <Typography className="step-description">
                Click to randomly select a comforting Quranic verse
              </Typography>
            </Box>
            
            <Box className="step-card">
              <div className="step-number">3</div>
              <AutoStoriesIcon className="step-icon" />
              <Typography variant="h5" className="step-title">
                Receive Ayah
              </Typography>
              <Typography className="step-description">
                Get a meaningful verse with translation and audio
              </Typography>
            </Box>
          </div>
        </Container>
      </section>

      {/* Features Section */}
     
    </div>
  );
};

export default Home;
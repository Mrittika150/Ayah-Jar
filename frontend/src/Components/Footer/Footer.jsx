import React from 'react';
import { Container, Grid, Typography, Box, Link } from '@mui/material';
import MosqueIcon from '@mui/icons-material/Mosque';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box className="footer-brand">
              <MosqueIcon className="footer-logo" />
              <Typography variant="h5" className="footer-title">
                Ayah Jar
              </Typography>
            </Box>
            <Typography variant="body2" className="footer-description">
              A digital sanctuary providing Quranic comfort and spiritual support.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" className="footer-heading">
                  Quick Links
                </Typography>
                <Box className="footer-links">
                  <Link href="/" className="footer-link">Home</Link>
                  <Link href="/jar" className="footer-link">The Jar</Link>
                  <Link href="/features" className="footer-link">Features</Link>
                  <Link href="/about" className="footer-link">About</Link>
                </Box>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Typography variant="h6" className="footer-heading">
                  Resources
                </Typography>
                <Box className="footer-links">
                  <Link href="/quran" className="footer-link">Quran</Link>
                  <Link href="/prayers" className="footer-link">Prayer Times</Link>
                  <Link href="/calendar" className="footer-link">Islamic Calendar</Link>
                  <Link href="/duas" className="footer-link">Daily Duas</Link>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="footer-heading">
                  About This Project
                </Typography>
                <Typography variant="body2" className="footer-about">
                  Ayah Jar is a non-profit project created to provide spiritual comfort 
                  through Quranic verses. It's free, open-source, and accessible to everyone.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Box className="footer-bottom">
          <Typography variant="body2" className="copyright">
            © {new Date().getFullYear()} Ayah Jar. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
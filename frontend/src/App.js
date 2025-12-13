import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Components/Header/Header';

import Home from './Components/Home/Home';
import Jar from './Components/Jar/Jar';

import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#D4AF37',
      light: '#FFE082',
      dark: '#B28900',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jar" element={<Jar />} />
              
            </Routes>
          </main>
          
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
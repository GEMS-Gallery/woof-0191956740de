import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './components/Home';
import WalkerList from './components/WalkerList';
import BookingForm from './components/BookingForm';
import ClientRegistration from './components/ClientRegistration';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#2196F3',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/walkers" element={<WalkerList />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/register" element={<ClientRegistration />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

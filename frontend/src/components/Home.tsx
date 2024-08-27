import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Dog Walking Service
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Professional and caring dog walkers at your service
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/book"
            size="large"
            sx={{ mr: 2 }}
          >
            Book a Walk
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/walkers"
            size="large"
          >
            Meet Our Walkers
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;

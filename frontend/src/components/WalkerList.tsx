import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { backend } from '../../declarations/backend';

interface Walker {
  id: bigint;
  name: string;
  experience: string;
}

const WalkerList: React.FC = () => {
  const [walkers, setWalkers] = useState<Walker[]>([]);

  useEffect(() => {
    const fetchWalkers = async () => {
      try {
        const walkerList = await backend.listWalkers();
        setWalkers(walkerList);
      } catch (error) {
        console.error('Error fetching walkers:', error);
      }
    };

    fetchWalkers();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
        Our Dog Walkers
      </Typography>
      <Grid container spacing={4}>
        {walkers.map((walker) => (
          <Grid item key={walker.id.toString()} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://loremflickr.com/320/240/dog?lock=${Number(walker.id) % 1024}`}
                alt={walker.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {walker.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience: {walker.experience}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WalkerList;

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from '../../declarations/backend';

interface ClientRegistrationData {
  name: string;
  dogName: string;
  dogBreed: string;
}

const ClientRegistration: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm<ClientRegistrationData>();

  const onSubmit = async (data: ClientRegistrationData) => {
    setLoading(true);
    try {
      const clientId = await backend.registerClient(
        data.name,
        data.dogName,
        data.dogBreed ? [data.dogBreed] : []
      );
      alert(`Client registered successfully! Your Client ID is: ${clientId}`);
      reset();
    } catch (error) {
      console.error('Error registering client:', error);
      alert('An error occurred while registering the client.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
        Client Registration
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Your Name"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="dogName"
          control={control}
          defaultValue=""
          rules={{ required: 'Dog name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Dog's Name"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="dogBreed"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Dog's Breed (optional)"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ClientRegistration;

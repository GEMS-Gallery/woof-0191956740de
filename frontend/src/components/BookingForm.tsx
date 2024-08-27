import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from '../../declarations/backend';

interface Walker {
  id: bigint;
  name: string;
}

interface BookingFormData {
  clientId: string;
  walkerId: string;
  date: string;
  time: string;
  duration: string;
}

const BookingForm: React.FC = () => {
  const [walkers, setWalkers] = useState<Walker[]>([]);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm<BookingFormData>();

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

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    try {
      const timestamp = new Date(`${data.date}T${data.time}`).getTime() * 1000000; // Convert to nanoseconds
      const result = await backend.createBooking(
        BigInt(data.clientId),
        BigInt(data.walkerId),
        BigInt(timestamp),
        BigInt(parseInt(data.duration))
      );
      if ('ok' in result) {
        alert('Booking created successfully!');
        reset();
      } else {
        alert(`Error creating booking: ${result.err}`);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred while creating the booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
        Book a Dog Walk
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="clientId"
          control={control}
          defaultValue=""
          rules={{ required: 'Client ID is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Client ID"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="walkerId"
          control={control}
          defaultValue=""
          rules={{ required: 'Walker is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              select
              label="Walker"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            >
              {walkers.map((walker) => (
                <MenuItem key={walker.id.toString()} value={walker.id.toString()}>
                  {walker.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="date"
          control={control}
          defaultValue=""
          rules={{ required: 'Date is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="date"
              label="Date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="time"
          control={control}
          defaultValue=""
          rules={{ required: 'Time is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="time"
              label="Time"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="duration"
          control={control}
          defaultValue=""
          rules={{ required: 'Duration is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Duration (minutes)"
              type="number"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Booking...' : 'Book Walk'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default BookingForm;

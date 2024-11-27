import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, List, ListItem, ListItemText, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PassengerDetailsPage() {
  const [passengers, setPassengers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');
  const [seat, setSeat] = useState('');
  const navigate = useNavigate();

  const handleAddPassenger = () => {
    const category = age < 12 ? 'Child' : age >= 60 ? 'Senior' : 'General';
    const price = category === 'Child' ? 500 : category === 'Senior' ? 700 : 1000;
    setPassengers([...passengers, { name, age, id, category, price, seat }]);
    setName('');
    setAge('');
    setId('');
    setSeat('');
  };

  const handleConfirmBooking = () => {
    navigate('/payment');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Passenger Details
        </Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Age"
          variant="outlined"
          margin="normal"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="ID Number"
          variant="outlined"
          margin="normal"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Seat Type</InputLabel>
          <Select
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
            label="Seat Type"
            required
          >
            <MenuItem value="Window">Window</MenuItem>
            <MenuItem value="Upper">Upper</MenuItem>
            <MenuItem value="Lower">Lower</MenuItem>
            <MenuItem value="Semi-Sleeper">Semi-Sleeper</MenuItem>
          </Select>
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddPassenger}
          sx={{ borderRadius: 5, mb: 2 }}
        >
          Add Passenger
        </Button>
        <List>
          {passengers.map((passenger, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Name: ${passenger.name}, Age: ${passenger.age}, ID: ${passenger.id}, Category: ${passenger.category}, Price: ${passenger.price}, Seat: ${passenger.seat}`}
              />
            </ListItem>
          ))}
        </List>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleConfirmBooking}
          sx={{ borderRadius: 5 }}
        >
          Proceed to Payment
        </Button>
      </Box>
    </Container>
  );
}

export default PassengerDetailsPage;

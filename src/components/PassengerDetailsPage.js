import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PassengerDetailsPage() {
  const [passengers, setPassengers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleAddPassenger = () => {
    const category = age < 12 ? 'Child' : age >= 60 ? 'Senior' : 'General';
    const price = category === 'Child' ? 500 : category === 'Senior' ? 700 : 1000;
    setPassengers([...passengers, { name, age, id, category, price }]);
    setName('');
    setAge('');
    setId('');
  };

  const handleConfirm = () => {
    navigate('/payment');
  };

  const totalAmount = passengers.reduce((acc, curr) => acc + curr.price, 0);

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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddPassenger}
          sx={{ borderRadius: 5, mt: 2 }}
        >
          Add Passenger
        </Button>
        <List>
          {passengers.map((passenger, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
              <ListItemText
                primary={`${passenger.name} (${passenger.category})`}
                secondary={`Age: ${passenger.age}, ID: ${passenger.id}, Price: ₹${passenger.price}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" align="center" gutterBottom>
          Total Amount: ₹{totalAmount}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          sx={{ borderRadius: 5, mt: 2 }}
        >
          Confirm and Proceed to Payment
        </Button>
      </Box>
    </Container>
  );
}

export default PassengerDetailsPage;

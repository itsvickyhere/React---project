import React, { useState } from 'react';
import { Button, Typography, Container, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handlePayment = () => {
    // Implement payment logic here
    navigate('/ticket');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Payment
        </Typography>
        <TextField
          fullWidth
          label="Card Number"
          variant="outlined"
          margin="normal"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Expiry Date"
          variant="outlined"
          margin="normal"
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          fullWidth
          label="CVV"
          variant="outlined"
          margin="normal"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handlePayment}
          sx={{ borderRadius: 5, mt: 2 }}
        >
          Pay Now
        </Button>
      </Box>
    </Container>
  );
}

export default PaymentPage;

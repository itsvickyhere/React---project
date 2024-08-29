import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Implement validation and signup logic here
    navigate('/home');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          sx={{ borderRadius: 2 }}
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
          sx={{ borderRadius: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ borderRadius: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ borderRadius: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          sx={{ borderRadius: 5, mt: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default SignUpPage;

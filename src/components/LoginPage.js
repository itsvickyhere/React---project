import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.endsWith('@gmail.com')) {
      alert('Please enter a valid Gmail address.');
      return;
    }
    // Implement validation and login logic here
    navigate('/home');
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          onClick={() => setShowPassword(!showPassword)}
          sx={{ mb: 2 }}
        >
          {showPassword ? 'Hide' : 'Show'} Password
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ borderRadius: 5 }}
        >
          Login
        </Button>
        <Box textAlign="center" mt={2}>
          <Link href="/signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
